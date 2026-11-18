#!/usr/bin/env node
/** Exhaustive local asset measurements; flags are review prompts, not visual judgments. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const extensions = /\.(?:jpe?g|png|webp|avif|gif|svg|ico)$/i;
async function walk(dir) {
  const entries = await fs.readdir(path.join(root, dir), { withFileTypes: true });
  const lists = await Promise.all(entries.map(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : extensions.test(e.name) ? [`${dir}/${e.name}`] : []));
  return lists.flat();
}
const files = (await Promise.all(['src/assets', 'public'].map(walk))).flat().sort();
const rows = [];
for (const file of files) {
  const bytes = await fs.readFile(path.join(root, file));
  try {
    const m = await sharp(bytes).metadata();
    const rotated = [5, 6, 7, 8].includes(m.orientation);
    const width = rotated ? m.height : m.width, height = rotated ? m.width : m.height;
    const vector = file.endsWith('.svg');
    // Card sources target 720 px; hero sources target 1600 px (docs/IMAGES.md).
    const photo = file.startsWith('src/assets/photos/') && !vector;
    const card = photo && Math.min(width, height * 4 / 3) < 720;
    const hero = photo && Math.min(width, height * 16 / 9) < 1600;
    rows.push({ file, width, height, bytes: bytes.length, vector, photo, card, hero });
  } catch (error) {
    rows.push({ file, bytes: bytes.length, error: error.message.split('\n')[0] });
  }
}
const missing = [];
for (const group of ['cities', 'regions', 'spots']) {
  const manifest = JSON.parse(await fs.readFile(path.join(root, `src/assets/photos/${group}/manifest.json`), 'utf8'));
  for (const [id, item] of Object.entries(manifest)) {
    try { await fs.access(path.join(root, `src/assets/photos/${group}`, item.file)); }
    catch { missing.push(`${group}/${id} → ${item.file}`); }
  }
}
const escape = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const table = list => [
  '| Fichier | Dimensions orientées | Poids Ko | Revue à prévoir |',
  '|---|---:|---:|---|',
  ...list.map(r => `| ${escape(r.file)} | ${r.error ? 'illisible' : `${r.width} × ${r.height}`} | ${Math.round(r.bytes / 1024)} | ${escape(r.error ?? (r.vector ? 'vectoriel' : !r.photo ? 'hors photographie : rôle spécifique à examiner' : r.card ? 'recadrage 4:3 sous 720 px : carte à examiner' : r.hero ? 'recadrage 16:9 sous 1600 px : héro à examiner' : 'dimensions suffisantes ; cadrage à vérifier'))} |`),
].join('\n');
const small = rows.filter(r => r.card), errors = rows.filter(r => r.error);
const report = [
  '# Contrôle des dimensions des images', '',
  `Généré par \`node tools/audit-image-quality.mjs\` le ${new Date().toISOString().slice(0, 10)}.`, '',
  `**${rows.length} fichiers examinés**, dont ${rows.filter(r => r.vector).length} vectoriels ; ${small.length} photos sous 720 px après recadrage 4:3 ; ${errors.length} fichier(s) non lisible(s) par Sharp ; ${missing.length} référence(s) de manifeste manquante(s).`, '',
  'Périmètre : toutes les images de `src/assets` et `public`, y compris les images non utilisées et les variantes déjà générées. Les sorties `dist` et les dépendances sont exclues. Les dimensions tiennent compte de la rotation EXIF. Seules les photographies de `src/assets/photos` sont soumises aux seuils : largeur disponible après recadrage 4:3 pour les cartes (720 px) et 16:9 pour les héros (1600 px). Les seuils repèrent les sources à examiner : le rôle réel, le ratio et le cadrage doivent être contrôlés dans les pages. Une grande dimension ne prouve ni la netteté, ni la date, ni le lieu, ni la licence. Les fichiers ICO sont signalés si le décodeur ne les lit pas.', '',
  '## Photos sous 720 px après recadrage 4:3', '', table(small), '',
  '## Références manquantes', '', missing.length ? missing.map(s => `- ${s}`).join('\n') : 'Aucune.', '',
  '## Inventaire complet', '', table(rows), '',
].join('\n');
await fs.writeFile(path.join(root, 'docs/IMAGES-QUALITE.md'), report);
console.log(`${rows.length} images ; ${small.length} sous 720 px ; ${errors.length} non lisibles ; ${missing.length} références manquantes. Rapport : docs/IMAGES-QUALITE.md`);
if (missing.length) process.exitCode = 1;
