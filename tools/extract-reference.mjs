/**
 * Extrait de la maquette de référence les tuiles « exactes » (texte incrusté) à l'échelle 1:1 :
 * cinq cartes destination et le bandeau checklists. Les tuiles du ZIP contiennent des fragments
 * des cartes voisines et du titre de section ; la capture de référence, elle, est nette.
 * Usage : node tools/extract-reference.mjs [reference.png]
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const ref = process.argv[2] ?? 'visual-audit/reference.png';
await mkdir('public/assets/cards/ref', { recursive: true });

// Cartes destination : rangée de 5 cartes 245,6 × 125, gouttière 12, à partir de x = 86, y = 854.
const cardW = (1276 - 4 * 12) / 5;
const top = Number(process.env.DEST_TOP ?? 854);
const cities = ['marrakech', 'fes', 'chefchaouen', 'agadir', 'casablanca'];
for (let i = 0; i < cities.length; i++) {
  const left = Math.round(86 + i * (cardW + 12));
  await sharp(ref)
    .extract({ left, top, width: Math.round(cardW), height: 125 })
    .png()
    .toFile(`public/assets/cards/ref/destination-${cities[i]}.png`);
}

// Bandeau checklists : 1312 × 80, centré (x = 68), sous les cartes.
const bannerTop = Number(process.env.BANNER_TOP ?? 1002);
await sharp(ref).extract({ left: 68, top: bannerTop, width: 1312, height: 80 }).png().toFile('public/assets/cards/ref/checklist-banner.png');

// Bandeaux parcours : trois cartes 424,67 × 158 (bordure ivoire incluse), gouttière 9, à partir de x = 78.
const featureTop = Number(process.env.FEATURE_TOP ?? 314);
const featureW = (1292 - 2 * 9) / 3;
const feats = ['je-rentre-au-maroc', 'je-souhaite-investir', 'je-visite-le-maroc'];
for (let i = 0; i < feats.length; i++) {
  const left = Math.round(78 + i * (featureW + 9));
  await sharp(ref)
    .extract({ left, top: featureTop, width: Math.round(featureW), height: 158 })
    .png()
    .toFile(`public/assets/cards/ref/${feats[i]}.png`);
}
console.log('tuiles extraites dans public/assets/cards/ref/');
