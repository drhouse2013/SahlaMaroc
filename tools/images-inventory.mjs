#!/usr/bin/env node
/**
 * Inventaire des images de lieux -> docs/IMAGES-INVENTAIRE.md
 * Usage : node tools/images-inventory.mjs   (npm run images:inventory)
 * Sources : src/assets/photos/{cities,regions,spots}/manifest.json + src/data/{cities,regions,spots}.ts.
 * Règle de statut identique au site : src/utils/photoStatus.ts (isVerified).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jiti = createJiti(import.meta.url);
const { CITY_PAGES, cityLabel } = await jiti.import('../src/data/cities.ts');
const { REGIONS } = await jiti.import('../src/data/regions.ts');
const { SPOTS } = await jiti.import('../src/data/spots.ts');
const { isVerified, licenseOf } = await jiti.import('../src/utils/photoStatus.ts');

const manifest = (dir) => JSON.parse(fs.readFileSync(path.join(ROOT, 'src/assets/photos', dir, 'manifest.json'), 'utf8'));
const M = { cities: manifest('cities'), regions: manifest('regions'), spots: manifest('spots') };

const V = 'vérifiée', P = 'placeholder', C = 'à confirmer';
const HOSTS = { 'commons.wikimedia.org': 'Wikimedia Commons', 'unsplash.com': 'Unsplash', 'www.pexels.com': 'Pexels', 'pexels.com': 'Pexels' };
const cell = (s) => String(s).replace(/\|/g, '\\|');

/** Ligne d'inventaire pour une entrée de manifeste (ou son absence). */
function row(name, dir, id, note = '') {
  const e = M[dir][id];
  if (!e) return { name, image: '—', source: '—', url: '', status: P, license: '—', note };
  const exists = fs.existsSync(path.join(ROOT, 'src/assets/photos', dir, e.file));
  const status = exists && isVerified(e) ? V : C;
  let host = '—';
  try { host = HOSTS[new URL(e.source).hostname] ?? new URL(e.source).hostname; } catch { /* source absente ou invalide */ }
  const why = !exists ? ' (fichier introuvable)' : status === C ? ' (crédit, licence ou source incomplets)' : '';
  return { name, image: `${dir}/${e.file}`, source: host, url: e.source ?? '', status, license: licenseOf(e.credit) ?? '?', note: note + why };
}

const sections = [];
sections.push({ title: 'Hero accueil', rows: [row('Accueil (hero)', 'cities', 'home-hero')] });
sections.push({ title: 'Villes', rows: CITY_PAGES.map((c) => row(cityLabel(c.id, 'fr'), 'cities', c.id)) });
sections.push({
  title: 'Régions',
  rows: REGIONS.map((r) => {
    const own = row(r.name.fr, 'regions', r.id);
    if (own.status !== P || !r.capitalCity) return own;
    const cap = row(r.name.fr, 'cities', r.capitalCity, `photo du chef-lieu (${cityLabel(r.capitalCity, 'fr')})`);
    return cap.status === V ? cap : own;
  }),
});
const spotSections = Object.entries(SPOTS).map(([cityId, spots]) => ({
  title: cityLabel(cityId, 'fr'),
  rows: spots.map((s) => row(s.name.fr, 'spots', `${cityId}/${s.id}`)),
}));
sections.push({ title: 'Lieux à visiter', rows: spotSections.flatMap((s) => s.rows), groups: spotSections });

const count = (rows, st) => rows.filter((r) => r.status === st).length;
const all = sections.flatMap((s) => s.rows);
const line = (r) => `| ${cell(r.name)} | ${r.image === '—' ? '— (« Photo à venir »)' : `\`${r.image}\``} | ${r.source} | ${r.url ? `<${r.url}>` : '—'} | ${r.status} | ${r.license}${r.note ? ` ; ${cell(r.note.trim())}` : ''} |`;
const table = (rows) => ['| Lieu | Image actuelle | Source | URL | Statut | Licence / note |', '|---|---|---|---|---|---|', ...rows.map(line)].join('\n');

const out = [];
out.push('# Inventaire des images de lieux', '');
out.push(`> Généré par \`node tools/images-inventory.mjs\` (\`npm run images:inventory\`) le ${new Date().toISOString().slice(0, 10)}. Ne pas éditer à la main : modifier les manifestes (\`src/assets/photos/*/manifest.json\`) puis relancer. Règles : \`docs/IMAGES.md\`.`, '');
out.push(`**Total : ${all.length} lieux, ${count(all, V)} photos vérifiées, ${count(all, P)} placeholders (« Photo à venir »), ${count(all, C)} à confirmer.**`, '');
out.push('| Type | Lieux | Vérifiées | Placeholders | À confirmer |', '|---|---|---|---|---|');
for (const s of sections) out.push(`| ${s.title} | ${s.rows.length} | ${count(s.rows, V)} | ${count(s.rows, P)} | ${count(s.rows, C)} |`);
out.push('', '**Statuts.** *vérifiée* : fichier présent, auteur + licence reconnue (CC BY, CC BY-SA, CC0, domaine public, Unsplash/Pexels License) et lien source https ; seule cette photo est affichée. *placeholder* : aucune photo, le site affiche « Photo à venir ». *à confirmer* : entrée de manifeste incomplète ou `"verified": false` ; non affichée (placeholder) tant que non corrigée. Licences relevées lors de l\'ajout des photos (voir `IMAGE_CREDITS.md`), non revérifiées une à une ici.', '');
for (const s of sections) {
  out.push(`## ${s.title} (${s.rows.length})`, '');
  if (!s.groups) { out.push(table(s.rows), ''); continue; }
  for (const g of s.groups) out.push(`### ${g.title} (${count(g.rows, V)}/${g.rows.length} vérifiées)`, '', table(g.rows), '');
}
fs.writeFileSync(path.join(ROOT, 'docs/IMAGES-INVENTAIRE.md'), out.join('\n'));
console.log(`docs/IMAGES-INVENTAIRE.md : ${all.length} lieux, ${count(all, V)} vérifiées, ${count(all, P)} placeholders, ${count(all, C)} à confirmer.`);
