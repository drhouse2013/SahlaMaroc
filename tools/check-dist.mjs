#!/usr/bin/env node
/** Après build : npm run check:dist
 * - aucune URL es/de/ar dans dist/sitemap-*.xml ;
 * - chaque hreflang (sitemaps) pointe vers une page existante dans dist/. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL } from '../site.config.mjs';

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
// Catch broken editorial links and missing assets in every built language, not only indexed pages.
const builtFiles = new Set();
const htmlPages = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else {
      builtFiles.add('/' + path.relative(DIST, full).replaceAll('\\', '/'));
      if (entry.name.endsWith('.html')) htmlPages.push(full);
    }
  }
}
walk(DIST);
const origin = new URL(SITE_URL).origin;
const localTargets = new Set();
let references = 0;
for (const page of htmlPages) {
  const relative = path.relative(DIST, page).replaceAll('\\', '/');
  for (const [, raw] of fs.readFileSync(page, 'utf8').matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    if (raw.startsWith('#')) continue;
    let target;
    try { target = new URL(raw.replaceAll('&amp;', '&'), new URL('/' + relative, SITE_URL)); }
    catch { errors.push(`${relative}: URL invalide ${raw}`); continue; }
    if (target.origin !== origin) continue;
    references++;
    const pathname = decodeURIComponent(target.pathname);
    if (localTargets.has(pathname)) continue;
    localTargets.add(pathname);
    const clean = pathname.replace(/\/$/, '');
    if (![pathname, clean + '/index.html', clean + '.html'].some((p) => builtFiles.has(p))) {
      errors.push(`${relative}: lien ou ressource absente ${pathname}`);
    }
  }
}
for (const x of errors) console.error('❌', x);
console.log(`${files.length} sitemap(s) · ${urls} URL · ${hrefs} hreflang · ${htmlPages.length} pages · ${references} références locales · ${errors.length} erreur(s)`);
process.exit(errors.length ? 1 : 0);
