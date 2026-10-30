#!/usr/bin/env node
/**
 * Recherche de CANDIDATS de photos (Unsplash / Pexels) pour les lieux sans photo vérifiée.
 * Outil de build uniquement : jamais importé par le frontend, aucune clé n'atteint le navigateur, aucune image n'est
 * téléchargée ni intégrée. Sortie : docs/IMAGES-CANDIDATS.md, à valider visuellement (voir docs/IMAGES.md).
 *
 * Usage : node tools/fetch-place-photos.mjs [--limit 20] [--per 3] [--only ville/lieu]   (npm run images:candidates)
 * Clés (facultatives) : UNSPLASH_ACCESS_KEY, PEXELS_API_KEY dans l'environnement ou .env.local / .env (valeurs jamais affichées).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KEYS = ['UNSPLASH_ACCESS_KEY', 'PEXELS_API_KEY'];

// 1) Clés : environnement d'abord, puis .env.local / .env (parse minimal ; on ne lit que les deux noms ci-dessus).
for (const f of ['.env.local', '.env']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  for (const l of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && KEYS.includes(m[1]) && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
const unsplash = process.env.UNSPLASH_ACCESS_KEY || '';
const pexels = process.env.PEXELS_API_KEY || '';
if (!unsplash && !pexels) {
  console.log('Aucune clé UNSPLASH_ACCESS_KEY ni PEXELS_API_KEY (environnement, .env.local, .env) : rien à faire. Voir docs/IMAGES.md.');
  process.exit(0);
}
console.log(`Fournisseurs actifs : ${[unsplash && 'Unsplash', pexels && 'Pexels'].filter(Boolean).join(', ')}`);

// 2) Lieux sans photo vérifiée (même règle que le site).
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const limit = Number(arg('limit', 20)), per = Number(arg('per', 3)), only = arg('only', '');
const jiti = createJiti(import.meta.url);
const { SPOTS } = await jiti.import('../src/data/spots.ts');
const { cityLabel } = await jiti.import('../src/data/cities.ts');
const { isVerified } = await jiti.import('../src/utils/photoStatus.ts');
const spotsManifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/assets/photos/spots/manifest.json'), 'utf8'));
const targets = Object.entries(SPOTS).flatMap(([city, spots]) => spots
  .filter((s) => !isVerified(spotsManifest[`${city}/${s.id}`]) && (!only || only === `${city}/${s.id}`))
  .map((s) => ({ key: `${city}/${s.id}`, city: cityLabel(city, 'fr'), name: s.name.fr, query: `${s.name.en} ${cityLabel(city, 'en')} Morocco` })))
  .slice(0, limit);
console.log(`${targets.length} lieu(x) à chercher.`);

// 3) Recherche (1 requête / s / fournisseur ; arrêt propre sur 401, 403 ou 429).
const UTM = '?utm_source=sahlamaroc&utm_medium=referral';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let stop = '';
async function get(url, headers, provider) {
  const r = await fetch(url, { headers });
  if ([401, 403, 429].includes(r.status)) { stop = `${provider} : HTTP ${r.status} (clé invalide, droits ou limite de débit atteinte), arrêt.`; return null; }
  if (!r.ok) { console.log(`${provider} : HTTP ${r.status} ignoré`); return null; }
  return r.json();
}
const searchUnsplash = async (q) => {
  const j = await get(`https://api.unsplash.com/search/photos?${new URLSearchParams({ query: q, per_page: String(per), orientation: 'landscape' })}`, { Authorization: `Client-ID ${unsplash}`, 'Accept-Version': 'v1' }, 'Unsplash');
  return (j?.results ?? []).map((p) => ({ provider: 'Unsplash', author: p.user?.name ?? '?', authorUrl: p.user?.links?.html ? p.user.links.html + UTM : '', page: p.links?.html ? p.links.html + UTM : '', thumb: p.urls?.small ?? '', desc: p.alt_description || p.description || '' }));
};
const searchPexels = async (q) => {
  const j = await get(`https://api.pexels.com/v1/search?${new URLSearchParams({ query: q, per_page: String(per), orientation: 'landscape' })}`, { Authorization: pexels }, 'Pexels');
  return (j?.photos ?? []).map((p) => ({ provider: 'Pexels', author: p.photographer ?? '?', authorUrl: p.photographer_url ?? '', page: p.url ?? '', thumb: p.src?.medium ?? '', desc: p.alt || '' }));
};

const found = [];
for (const t of targets) {
  if (stop) break;
  const hits = [];
  if (unsplash && !stop) hits.push(...await searchUnsplash(t.query));
  if (pexels && !stop) hits.push(...await searchPexels(t.query));
  found.push({ ...t, hits });
  await sleep(1000);
}

// 4) Rapport à valider à la main.
const cell = (s) => String(s).replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
const md = ['# Candidats photos à valider', '',
  `> Généré par \`node tools/fetch-place-photos.mjs\` le ${new Date().toISOString().slice(0, 10)}. **Aucune de ces photos n'est intégrée.** Pour chaque lieu : ouvrir la page de la photo, vérifier visuellement qu'elle montre le lieu EXACT (pas un autre lieu ni une scène générique), relever photographe + licence + lien, télécharger depuis la page publique, puis ajouter l'entrée au manifeste (voir \`docs/IMAGES.md\`). Sans certitude : laisser le placeholder « Photo à venir ». Photos fournies par Unsplash et Pexels.`, ''];
for (const f of found) {
  md.push(`### ${f.city} : ${f.name} (\`${f.key}\`)`, '', `Requête : \`${f.query}\``, '');
  if (!f.hits.length) { md.push('Aucun candidat.', ''); continue; }
  md.push('| Fournisseur | Photographe | Page photo | Aperçu | Description du fournisseur | Lieu exact confirmé |', '|---|---|---|---|---|---|');
  for (const h of f.hits) md.push(`| ${h.provider} | ${h.authorUrl ? `[${cell(h.author)}](${h.authorUrl})` : cell(h.author)} | <${h.page}> | [aperçu](${h.thumb}) | ${cell(h.desc) || '—'} | [ ] |`);
  md.push('');
}
if (stop) md.push(`> Recherche interrompue : ${stop}`, '');
fs.writeFileSync(path.join(ROOT, 'docs/IMAGES-CANDIDATS.md'), md.join('\n'));
console.log(`docs/IMAGES-CANDIDATS.md écrit (${found.length} lieu(x), ${found.reduce((n, f) => n + f.hits.length, 0)} candidat(s)).${stop ? ' ' + stop : ''}`);
