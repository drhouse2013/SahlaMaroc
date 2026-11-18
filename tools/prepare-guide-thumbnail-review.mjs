import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const out = path.resolve(process.argv[2] ?? 'outputs/guide-thumbnail-review');
const manifest = JSON.parse(await fs.readFile('src/assets/photos/guides/editorial-photos.json', 'utf8'));
const files = new Map();
for (const [key, entry] of Object.entries(manifest)) {
  const file = path.resolve('src/assets/photos', entry.file);
  if (files.has(file)) files.get(file).guides.push(key);
  else files.set(file, { file, guides: [key] });
}
for (const file of (await fs.readdir('src/assets/photos/guides')).filter(f => f.endsWith('.webp'))) {
  const absolute = path.resolve('src/assets/photos/guides', file);
  files.set(absolute, { file: absolute, guides: ['generic/' + path.parse(file).name] });
}
const entries = [...files.values()];
await fs.mkdir(out, { recursive: true });
const boards = [];
for (let start = 0; start < entries.length; start += 12) {
  const layers = [];
  const batch = entries.slice(start, start + 12);
  for (const [i, entry] of batch.entries()) {
    const left = i % 3 * 340 + 10;
    const top = Math.floor(i / 3) * 280 + 10;
    layers.push({ input: await sharp(entry.file).rotate().resize(320, 240, { fit: 'cover' }).toBuffer(), left, top });
    const label = path.basename(entry.file).replaceAll('&', '&amp;').replaceAll('<', '&lt;');
    layers.push({ input: Buffer.from(`<svg width="320" height="30"><text x="2" y="19" font-size="12" fill="white">${label}</text></svg>`), left, top: top + 240 });
  }
  const file = `planche-${String(boards.length + 1).padStart(2, '0')}.jpg`;
  await sharp({ create: { width: 1020, height: 1120, channels: 3, background: '#172322' } }).composite(layers).jpeg({ quality: 88 }).toFile(path.join(out, file));
  boards.push({ file, entries: batch.map(e => ({ file: path.relative(root, e.file), guides: e.guides })) });
}
await fs.writeFile(path.join(out, 'index.json'), JSON.stringify({ note: 'Comparatifs centrés 4:3, sans les textes et cadres du site ; ne prouvent pas les dates ou droits.', boards }, null, 2));
console.log(`${entries.length} photos distinctes, ${boards.length} planches : ${out}`);
