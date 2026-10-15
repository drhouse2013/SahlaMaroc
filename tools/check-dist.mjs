#!/usr/bin/env node
/** Après build : npm run check:dist
 * - aucune URL es/de/ar dans dist/sitemap-*.xml ;
 * - chaque hreflang (sitemaps) pointe vers une page existante dans dist/. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const files = fs.readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f));
if (!files.length) { console.error('❌ aucun dist/sitemap-*.xml (build requis)'); process.exit(1); }

const exists = (u) => {
  const p = decodeURIComponent(new URL(u).pathname).replace(/\/$/, '');
  return [path.join(DIST, p, 'index.html'), path.join(DIST, p + '.html')].some((f) => fs.existsSync(f));
};
const errors = [];
const checked = new Set();
let urls = 0, hrefs = 0;
for (const f of files) {
  const xml = fs.readFileSync(path.join(DIST, f), 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    urls++;
    if (/^\/(es|de|ar)(\/|$)/.test(new URL(m[1]).pathname)) errors.push(`${f}: URL non indexée ${m[1]}`);
  }
  for (const m of xml.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)) {
    hrefs++;
    if (/^(es|de|ar)\b/i.test(m[1])) errors.push(`${f}: hreflang ${m[1]} présent`);
    if (checked.has(m[2])) continue;
    checked.add(m[2]);
    if (!exists(m[2])) errors.push(`${f}: hreflang ${m[1]} vers page absente ${m[2]}`);
  }
}
for (const x of errors) console.error('❌', x);
console.log(`${files.length} sitemap(s) · ${urls} URL · ${hrefs} hreflang · ${errors.length} erreur(s)`);
process.exit(errors.length ? 1 : 0);
