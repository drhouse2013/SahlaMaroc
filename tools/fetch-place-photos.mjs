#!/usr/bin/env node
/**
 * Recherche de CANDIDATS de photos (Wikimedia Commons / Unsplash / Pexels) pour les lieux sans photo vérifiée.
 * Outil de build uniquement : jamais importé par le frontend, aucune clé n'atteint le navigateur, aucune image n'est
 * téléchargée ni intégrée. Sortie : docs/IMAGES-CANDIDATS.md, à valider visuellement (voir docs/IMAGES.md).
 *
 * Usage : node tools/fetch-place-photos.mjs [--limit 20] [--per 3] [--only ville/lieu] [--commons-only|--no-commons]
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
const commons = !process.argv.includes('--no-commons');
const commonsOnly = process.argv.includes('--commons-only');
const unsplash = commonsOnly ? '' : process.env.UNSPLASH_ACCESS_KEY || '';
const pexels = commonsOnly ? '' : process.env.PEXELS_API_KEY || '';
if (!commons && !unsplash && !pexels) {
  console.log('Aucune clé UNSPLASH_ACCESS_KEY ni PEXELS_API_KEY (environnement, .env.local, .env) : rien à faire. Voir docs/IMAGES.md.');
  process.exit(0);
}
console.log(`Fournisseurs actifs : ${[commons && 'Wikimedia Commons', unsplash && 'Unsplash', pexels && 'Pexels'].filter(Boolean).join(', ')}`);

// 2) Lieux sans photo vérifiée (même règle que le site).
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const limit = Number(arg('limit', 20)), per = Number(arg('per', 3)), only = arg('only', '');
if (!Number.isInteger(limit) || limit < 1 || limit > 500 || !Number.isInteger(per) || per < 1 || per > 20) throw new Error('--limit doit être entre 1 et 500 ; --per entre 1 et 20.');
const jiti = createJiti(import.meta.url);
const { SPOTS } = await jiti.import('../src/data/spots.ts');
const { cityLabel } = await jiti.import('../src/data/cities.ts');
const { isVerified } = await jiti.import('../src/utils/photoStatus.ts');
const spotsManifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/assets/photos/spots/manifest.json'), 'utf8'));
const targets = Object.entries(SPOTS).flatMap(([city, spots]) => spots
  .filter((s) => !isVerified(spotsManifest[`${city}/${s.id}`]) && (!only || only === `${city}/${s.id}`))
  .map((s) => ({ key: `${city}/${s.id}`, city: cityLabel(city, 'fr'), name: s.name.fr, names: [s.name.fr, s.name.en], cities: [cityLabel(city, 'fr'), cityLabel(city, 'en')], query: `${s.name.en} ${cityLabel(city, 'en')} Morocco` })))
  .slice(0, limit);
console.log(`${targets.length} lieu(x) à chercher.`);

// 3) Recherche (1 requête / s / fournisseur ; arrêt propre sur 401, 403 ou 429).
const UTM = '?utm_source=sahlamaroc&utm_medium=referral';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let stop = '';
async function get(url, headers, provider) {
  const r = await fetch(url, { headers, signal: AbortSignal.timeout(60000) });
  if ([401, 403, 429].includes(r.status)) { stop = `${provider} : HTTP ${r.status} (${r.status === 429 ? 'limite de débit temporaire ; relancer plus tard' : 'accès refusé'}), arrêt.`; return null; }
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
const plain = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const searchCommons = async (target) => {
  const query = `${target.name} ${target.city}`;
  const params = new URLSearchParams({ action: 'query', format: 'json', generator: 'search', gsrsearch: query, gsrnamespace: '6', gsrlimit: String(per), prop: 'imageinfo', iiprop: 'url|extmetadata|size', iiurlwidth: '480' });
  const j = await get(`https://commons.wikimedia.org/w/api.php?${params}`, { 'User-Agent': 'SahlaMarocPhotoCandidates/1.0 (manual editorial review)' }, 'Wikimedia Commons');
  if (j?.error) throw new Error(`Wikimedia Commons : ${j.error.code}`);
  return Object.values(j?.query?.pages ?? {}).filter(p => /\.(?:jpe?g|png|webp|avif)$/i.test(p.title)).map(p => {
    const i = p.imageinfo?.[0], m = i?.extmetadata;
    return { provider: 'Wikimedia Commons', author: plain(m?.Artist?.value), page: i?.descriptionurl ?? '', thumb: i?.thumburl ?? '', desc: plain(m?.ImageDescription?.value).slice(0, 400), date: plain(m?.DateTimeOriginal?.value), license: plain(m?.LicenseShortName?.value), dimensions: i ? `${i.width} × ${i.height}` : '' };
  }).filter(p => p.page && p.thumb);
};

const found = [];
for (const t of targets) {
  if (stop) break;
  const hits = [];
  if (commons && !stop) hits.push(...await searchCommons(t));
  if (unsplash && !stop) hits.push(...await searchUnsplash(t.query));
  if (pexels && !stop) hits.push(...await searchPexels(t.query));
  if (stop) break;
  found.push({ ...t, hits });
  console.log(`${found.length}/${targets.length} : ${t.key} (${hits.length} candidat(s))`);
  await sleep(commons ? 6000 : 1000);
}

// 4) Rapport à valider à la main.
const cell = (s) => String(s).replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
const md = ['# Candidats photos à valider', '',
  `> Généré par \`node tools/fetch-place-photos.mjs\` le ${new Date().toISOString().slice(0, 10)}. **Aucune de ces photos n'est intégrée.** Pour chaque lieu : ouvrir la page de la photo, vérifier visuellement qu'elle montre le lieu EXACT (pas un autre lieu ni une scène générique), relever photographe + licence + lien, télécharger depuis la page publique, puis ajouter l'entrée au manifeste (voir \`docs/IMAGES.md\`). Sans certitude : laisser le placeholder « Photo à venir ». Wikimedia indique la date déclarée DateTimeOriginal, la licence et les dimensions originales ; ces métadonnées ne prouvent pas le lieu exact. Fournisseurs : Wikimedia Commons, Unsplash et Pexels.`, ''];
for (const f of found) {
  md.push(`### ${f.city} : ${f.name} (\`${f.key}\`)`, '', `Recherche Wikimedia : \`${cell(f.name)} ${cell(f.city)}\`. Requête Unsplash/Pexels : \`${f.query}\`.`, '');
  if (!f.hits.length) { md.push('Aucun candidat.', ''); continue; }
  md.push('| Fournisseur | Photographe | Date déclarée | Licence déclarée | Original | Page photo | Aperçu | Description du fournisseur | Lieu exact confirmé |', '|---|---|---|---|---|---|---|---|---|');
  for (const h of f.hits) md.push(`| ${h.provider} | ${h.authorUrl ? `[${cell(h.author)}](${h.authorUrl})` : cell(h.author)} | ${cell(h.date || 'à vérifier')} | ${cell(h.license || 'à vérifier')} | ${h.dimensions || '—'} | <${h.page}> | [aperçu](${h.thumb}) | ${cell(h.desc) || '—'} | [ ] |`);
  md.push('');
}
if (stop) md.push(`> Recherche interrompue : ${stop}`, '');
fs.writeFileSync(path.join(ROOT, 'docs/IMAGES-CANDIDATS.md'), md.join('\n'));
console.log(`docs/IMAGES-CANDIDATS.md écrit (${found.length} lieu(x), ${found.reduce((n, f) => n + f.hits.length, 0)} candidat(s)).${stop ? ' ' + stop : ''}`);
