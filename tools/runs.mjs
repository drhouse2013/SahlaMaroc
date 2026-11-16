/**
 * Repère les blocs de texte (pixels sombres) d'une bande horizontale : node tools/runs.mjs <img> <y1> <y2> [seuil]
 * Sert à comparer la position des libellés entre la maquette et le rendu.
 */
import sharp from 'sharp';

const [file, ys, ye, th] = process.argv.slice(2);
const y1 = Number(ys), y2 = Number(ye);
const threshold = Number(th ?? 120);
const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const dark = new Uint8Array(info.width);
for (let x = 0; x < info.width; x++) {
  let c = 0;
  for (let y = y1; y <= y2; y++) {
    const i = (y * info.width + x) * 3;
    if ((data[i] + data[i + 1] + data[i + 2]) / 3 < threshold) c++;
  }
  dark[x] = c >= 2 ? 1 : 0;
}
const runs = [];
let s = -1;
for (let x = 0; x <= info.width; x++) {
  const on = x < info.width && dark[x] === 1;
  if (on && s === -1) s = x;
  if (!on && s !== -1) { if (x - s >= 2) runs.push([s, x - 1]); s = -1; }
}
// Fusionne les runs séparés de moins de 10 px (lettres d'un même mot).
const merged = [];
for (const r of runs) {
  const last = merged[merged.length - 1];
  if (last && r[0] - last[1] <= 10) last[1] = r[1];
  else merged.push([...r]);
}
console.log(`${file} y=${y1}..${y2} : ${merged.length} blocs`);
console.log(merged.map(([a, b]) => `${a}-${b}(${b - a + 1})`).join('  '));
