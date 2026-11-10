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
// Compare generated pages to the actual city-page itinerary declaration so a missing route cannot silently pass.
const cityPage = fs.readFileSync('src/components/hubs/CityPage.astro', 'utf8');
const declaration = cityPage.split('\n').find(line => line.startsWith('const stayCity ='));
if (!declaration) throw new Error('City itinerary declaration not found');
const expected = [...declaration.matchAll(/id === '([^']+)'/g)].map(match => match[1]);
if (!expected.length) throw new Error('No expected city itineraries found');
for (const city of expected) {
  if (!groups[city]) errors.push({ city, message: 'Expected itinerary missing from generated pages' });
}
for (const city of Object.keys(groups)) {
  if (!expected.includes(city)) errors.push({ city, message: 'Unexpected generated itinerary' });
}
for (const [city, translations] of Object.entries(groups)) {
  if (translations.length !== Object.keys(roots).length) errors.push({ city, translations: translations.length });
}
if (!rows.length) errors.push({ message: 'No generated itineraries found' });
console.log(JSON.stringify({ cities: Object.keys(groups).length, pages: rows.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;

