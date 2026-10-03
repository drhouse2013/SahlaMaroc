#!/usr/bin/env node
/**
 * Réécrit les liens internes des traductions (es, de, ar) vers les slugs traduits.
 *
 * Principe : on écrit/relit une traduction avec des liens "canoniques" vers la version anglaise
 * (ex. [guide](/en/ferry-to-morocco-guide)). Ce script remplace chaque lien par la version de la
 * même langue, grâce au `translationKey`. Si la page n'existe pas encore dans la langue cible,
 * le lien reste sur l'anglais (page toujours valide).
 *
 *   node tools/relink-translations.mjs            # es, de, ar
 *   node tools/relink-translations.mjs es         # une seule langue
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ALL = ['en', 'fr', 'es', 'de', 'ar'];
const targets = process.argv.slice(2).length ? process.argv.slice(2) : ['es', 'de', 'ar'];

const files = [];
for (const collection of ['articles', 'pages']) {
  for (const lang of ALL) {
    const dir = path.join(ROOT, 'src/content', collection, lang);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => /\.mdx?$/.test(x))) {
      const full = path.join(dir, f);
      const raw = fs.readFileSync(full, 'utf8');
      const { data } = matter(raw);
      files.push({ full, raw, lang, collection, key: data.translationKey, slug: data.slug });
    }
  }
}

const slugOf = {}; // lang -> key -> slug
const keyOf = {}; // lang -> slug -> key
for (const f of files) {
  (slugOf[f.lang] ??= {})[f.key] = f.slug;
  (keyOf[f.lang] ??= {})[f.slug] = f.key;
}

let changed = 0;
for (const f of files.filter((x) => targets.includes(x.lang))) {
  const out = f.raw.replace(/\]\(\/(en|fr)\/([a-z0-9-]+)((?:#[^)\s]*)?)\)/g, (m, from, slug, anchor) => {
    const key = keyOf[from]?.[slug];
    const to = key && slugOf[f.lang]?.[key];
    return to ? `](/${f.lang}/${to}${anchor})` : m;
  });
  if (out !== f.raw) {
    fs.writeFileSync(f.full, out);
    changed++;
  }
}
console.log(`${changed} fichier(s) mis à jour (${targets.join(', ')})`);
