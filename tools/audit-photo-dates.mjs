#!/usr/bin/env node
/** Read-only source audit. Dates remain declarations, not independent authentication. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const records = [];
for (const group of ['cities', 'regions', 'spots', 'guides']) {
  const file = group === 'guides' ? 'src/assets/photos/guides/editorial-photos.json' : `src/assets/photos/${group}/manifest.json`;
  const data = JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));
  for (const [id, entry] of Object.entries(data)) {
    let title;
    try { const url = new URL(entry.source); if (url.hostname === 'commons.wikimedia.org' && url.pathname.startsWith('/wiki/File:')) title = decodeURIComponent(url.pathname.slice(6)).replaceAll('_', ' '); } catch {}
    records.push({ id: `${group}/${id}`, source: entry.source, title });
  }
}
const titles = [...new Set(records.map(r => r.title).filter(Boolean))];
const found = new Map();
const plain = s => String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
for (let start = 0; start < titles.length; start += 40) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.search = new URLSearchParams({ action: 'query', format: 'json', redirects: '1', prop: 'imageinfo', iiprop: 'extmetadata|size', titles: titles.slice(start, start + 40).join('|') });
  const response = await fetch(url, { headers: { 'User-Agent': 'SahlaMarocPhotoAudit/1.0 (source date review)' }, signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Commons HTTP ${response.status}`);
  const result = await response.json();
  if (result.error) throw new Error(JSON.stringify(result.error));
  const aliases = [...(result.query.normalized ?? []), ...(result.query.redirects ?? [])];
  const pages = Object.values(result.query.pages ?? {});
  for (const requested of titles.slice(start, start + 40)) {
    let canonical = requested;
    for (let n = 0; n < aliases.length; n++) { const a = aliases.find(a => a.from === canonical); if (!a) break; canonical = a.to; }
    const info = pages.find(p => p.title === canonical)?.imageinfo?.[0];
    const meta = info?.extmetadata;
    const field = meta?.DateTimeOriginal?.value ? 'DateTimeOriginal' : '';
    found.set(requested, { date: plain(meta?.[field]?.value), field, dimensions: info ? `${info.width} × ${info.height}` : '', author: plain(meta?.Artist?.value), license: plain(meta?.LicenseShortName?.value) });
  }
  console.log(`${Math.min(start + 40, titles.length)}/${titles.length} sources Wikimedia consultées`);
}
const rows = records.map(r => ({ ...r, ...found.get(r.title) }));
const cell = s => String(s ?? '').replaceAll('|', '\\|');
const report = ['# Dates déclarées des photographies', '',
  `Relevé du ${new Date().toISOString().slice(0, 10)} via \`node tools/audit-photo-dates.mjs\`. ${records.length} entrées des manifestes villes, régions, lieux et guides ; ${titles.length} sources Wikimedia uniques interrogées.`, '',
  'Les dates viennent uniquement du champ Wikimedia DateTimeOriginal ; aucun repli sur DateTime, le nom du fichier ou la date de mise en ligne. Ce sont des déclarations de la source : elles ne prouvent pas à elles seules la date réelle, la netteté, le lieu ou les droits. Les autres hébergeurs et les dates absentes nécessitent une vérification manuelle. Les anciens fichiers non référencés et les photos de repli codées dans guidePhotos.ts ne font pas partie de ce relevé.', '',
  '| Entrée | Date déclarée | Champ | Original source | Licence déclarée | Source |', '|---|---|---|---|---|---|',
  ...rows.map(r => `| ${cell(r.id)} | ${cell(r.date || 'à vérifier')} | ${r.field || '—'} | ${r.dimensions || '—'} | ${cell(r.license || 'à vérifier')} | ${r.source ? `<${r.source}>` : '—'} |`), ''].join('\n');
await fs.writeFile(path.join(root, 'docs/PHOTOS-DATES.md'), report);
console.log(`${rows.filter(r => r.date).length} dates déclarées relevées ; ${rows.filter(r => !r.date).length} entrées à vérifier manuellement.`);
