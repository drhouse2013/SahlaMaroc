/** Repère les transitions verticales d'une colonne : node tools/scan.mjs <image> <x> <y1> <y2> */
import sharp from 'sharp';

const [file, xs, ys, ye] = process.argv.slice(2);
const x = Number(xs), y1 = Number(ys), y2 = Number(ye);
const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const at = (y) => {
  const i = (y * info.width + x) * 3;
  return [data[i], data[i + 1], data[i + 2]];
};
const isCream = ([r, g, b]) => r > 238 && g > 230 && b > 218 && Math.abs(r - g) < 16;
let prev = isCream(at(y1));
let start = y1;
for (let y = y1 + 1; y <= y2; y++) {
  const cur = isCream(at(y));
  if (cur !== prev) {
    console.log(`${start} → ${y - 1} (${y - start} px) ${prev ? 'crème' : 'contenu'} ${at(start).join(',')}`);
    start = y;
    prev = cur;
  }
}
console.log(`${start} → ${y2} (${y2 - start + 1} px) ${prev ? 'crème' : 'contenu'} ${at(start).join(',')}`);
