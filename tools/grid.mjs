/** Superpose une grille de mesure (50 px) sur une capture pour relever les coordonnées. */
import sharp from 'sharp';

const [src, dest] = process.argv.slice(2);
const { width, height } = await sharp(src).metadata();
const lines = [];
for (let y = 0; y <= height; y += 50) {
  const strong = y % 100 === 0;
  lines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${strong ? '#ff2d55' : '#00b3ff'}" stroke-width="1" opacity="${strong ? 0.9 : 0.45}"/>`);
  if (strong) lines.push(`<text x="6" y="${y - 3}" font-family="monospace" font-size="11" fill="#ff2d55">${y}</text>`);
}
for (let x = 0; x <= width; x += 50) {
  const strong = x % 100 === 0;
  lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${strong ? '#ff2d55' : '#00b3ff'}" stroke-width="1" opacity="${strong ? 0.55 : 0.25}"/>`);
  if (strong) lines.push(`<text x="${x + 2}" y="${height - 4}" font-family="monospace" font-size="10" fill="#ff2d55">${x}</text>`);
}
const svg = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${lines.join('')}</svg>`);
await sharp(src).composite([{ input: svg }]).png().toFile(dest);
console.log(`${dest} (${width}x${height})`);
