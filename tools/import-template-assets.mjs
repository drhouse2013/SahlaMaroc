/**
 * Import unique des ressources de la template Sahla Maroc (ZIP du 15/11/2026).
 * - Copie les fichiers propres (motifs, logos, hero) dans le projet.
 * - Recadre les captures « editables » pour n'en garder que la photo, sans texte incrusté :
 *   le site affiche ses textes en HTML (i18n fr/en/es/de/ar).
 * À exécuter une seule fois : node tools/import-template-assets.mjs <dossier-template>
 */
import sharp from 'sharp';
import { mkdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2];
if (!SRC) throw new Error('Usage : node tools/import-template-assets.mjs <dossier-template>');
const assets = path.join(SRC, 'public/assets');
const root = path.resolve('.');
const out = (p) => path.join(root, p);

const copy = async (from, to) => {
  await mkdir(path.dirname(out(to)), { recursive: true });
  await copyFile(path.join(assets, from), out(to));
  return to;
};

// 1. Fichiers vectoriels propres (motifs zellige, arabesques, palme, lanterne, logo) + hero.
const copies = [
  ['decor/motif-zellige.svg', 'public/assets/decor/motif-zellige.svg'],
  ['decor/motif-zellige-terracotta.svg', 'public/assets/decor/motif-zellige-terracotta.svg'],
  ['decor/coin-arabesque.svg', 'public/assets/decor/coin-arabesque.svg'],
  ['decor/ligne-ornement.svg', 'public/assets/decor/ligne-ornement.svg'],
  ['decor/palme.svg', 'public/assets/decor/palme.svg'],
  ['decor/lanterne.svg', 'public/assets/decor/lanterne.svg'],
  ['logos/logo-horizontal-clair.svg', 'public/assets/logos/logo-horizontal-clair.svg'],
  ['logos/logo-horizontal-sombre.svg', 'public/assets/logos/logo-horizontal-sombre.svg'],
  ['logos/logo-symbol.svg', 'public/assets/logos/logo-symbol.svg'],
  ['hero/hero-panorama.webp', 'src/assets/template/hero-panorama.webp'],
];
for (const [from, to] of copies) await copy(from, to);

// 2. Cartes « parcours » : les captures de la template contiennent le texte, son fantôme et une
//    flèche incrustée ; elles ne sont pas réutilisables telles quelles. Les cartes sont donc
//    reconstruites en HTML/CSS avec les photos éditoriales du site (voir home/FeatureCards.astro).

// 3. Bandeau checklists : bande littorale (photo + motif doré) sans l'interface autour.
{
  const meta = await sharp(path.join(assets, 'footer/plage-coucher-soleil.webp')).metadata();
  const top = Math.round(meta.height * 0.38);
  await sharp(path.join(assets, 'footer/plage-coucher-soleil.webp'))
    .extract({ left: 0, top, width: Math.round(meta.width * 0.78), height: meta.height - top })
    .resize({ width: 720 })
    .webp({ quality: 82 })
    .toFile(out('public/assets/cards/coast-checklist.webp'));
}

const list = await Promise.all(
  [
    'public/assets/decor/motif-zellige.svg',
    'public/assets/logos/logo-horizontal-clair.svg',
    'src/assets/template/hero-panorama.webp',
    'public/assets/cards/coast-checklist.webp',
  ].map(async (p) => `${p} — ${(await stat(out(p))).size} o`),
);
console.log(list.join('\n'));
