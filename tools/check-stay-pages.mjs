import fs from 'node:fs';
import path from 'node:path';

// Checks generated route structure. Editorial accuracy and visual quality require separate review.
const roots = { fr: 'villes', en: 'cities', es: 'ciudades', de: 'staedte', ar: 'mudun' };
const rows = [];
const errors = [];
for (const [lang, root] of Object.entries(roots)) {
  const dir = path.join('dist', lang, root);
  for (const slug of fs.readdirSync(dir)) {
    const file = path.join(dir, slug, 'index.html');
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const marker = html.match(/data-stay-city="([^"]+)"/);
    if (!marker) continue;
    const section = html.split(marker[0])[1].split('</section>')[0];
    const days = (section.match(/<details /g) ?? []).length;
    const maps = (section.match(/maps\/search/g) ?? []).length;
    const preparations = (section.match(/type="checkbox"/g) ?? []).length;
    const row = { city: marker[1], lang, file, days, maps, preparations };
    rows.push(row);
    if (days < 2 || maps < days || preparations !== 4 || section.includes('undefined')) errors.push(row);
  }
}
const groups = Object.groupBy(rows, row => row.city);
for (const [city, translations] of Object.entries(groups)) {
  if (translations.length !== Object.keys(roots).length) errors.push({ city, translations: translations.length });
}
if (!rows.length) errors.push({ message: 'No generated itineraries found' });
console.log(JSON.stringify({ cities: Object.keys(groups).length, pages: rows.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;

