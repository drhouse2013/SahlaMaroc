/**
 * Mesures géométriques : repère les bandes « fond crème » (gouttières entre sections) et les
 * colonnes occupées d'une capture, pour comparer la maquette et le rendu.
 * Usage : node tools/measure.mjs <image.png> [y1 y2]
 */
import sharp from 'sharp';

const file = process.argv[2];
const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const isCream = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  return r > 238 && g > 230 && b > 218 && Math.abs(r - g) < 16 && r - b < 34;
};

// Fraction de pixels crème par ligne
const rowCream = new Float32Array(height);
for (let y = 0; y < height; y++) {
  let c = 0;
  for (let x = 0; x < width; x += 2) if (isCream((y * width + x) * 3)) c++;
  rowCream[y] = c / Math.ceil(width / 2);
}

// Bandes de gouttière (>= 90 % crème)
const bands = [];
let start = -1;
for (let y = 0; y <= height; y++) {
  const gap = y < height && rowCream[y] >= 0.9;
  if (gap && start === -1) start = y;
  if (!gap && start !== -1) { if (y - start >= 4) bands.push([start, y - 1]); start = -1; }
}
console.log(`# ${file} ${width}x${height}`);
console.log('gouttières (y début → y fin, hauteur) :');
for (const [a, b] of bands) console.log(`  ${a} → ${b}  (${b - a + 1} px)`);

// Colonnes occupées dans une bande donnée
const [y1, y2] = [Number(process.argv[3] ?? -1), Number(process.argv[4] ?? -1)];
if (y1 >= 0) {
  const col = new Float32Array(width);
  for (let x = 0; x < width; x++) {
    let c = 0;
    for (let y = y1; y <= y2; y++) if (!isCream((y * width + x) * 3)) c++;
    col[x] = c / (y2 - y1 + 1);
  }
  const runs = [];
  let s = -1;
  for (let x = 0; x <= width; x++) {
    const busy = x < width && col[x] > 0.25;
    if (busy && s === -1) s = x;
    if (!busy && s !== -1) { if (x - s >= 8) runs.push([s, x - 1]); s = -1; }
  }
  console.log(`colonnes occupées entre y=${y1} et y=${y2} :`);
  for (const [a, b] of runs) console.log(`  x ${a} → ${b}  (largeur ${b - a + 1})`);
}
