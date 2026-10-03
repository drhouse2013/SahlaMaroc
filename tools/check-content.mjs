#!/usr/bin/env node
/**
 * Contrôle qualité du contenu (sans build) :
 *   npm run check:content
 *
 * Vérifie, pour chaque article et chaque page :
 *  - titre ≤ 70 caractères, description 50-160 caractères (mêmes règles que le schéma Astro) ;
 *  - slug valide et unique par langue ;
 *  - translationKey présent, et versions fr/en appariées (avertissement sinon) ;
 *  - liens internes /<lang>/<slug> qui pointent vers un contenu existant ;
 *  - absence de marqueurs de placeholder (TODO, FIXME, lorem, à compléter…).
 * Sort avec le code 1 s'il y a au moins une erreur (les avertissements ne bloquent pas).
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LANGS = ['en', 'fr', 'es', 'de', 'ar'];
// TODO/FIXME/TBD : sensibles à la casse (« todo » existe en espagnol) ; les autres marqueurs ne le sont pas.
const PLACEHOLDER = /\b(TODO|FIXME|TBD)\b|\b(lorem ipsum|à compléter|a completar|coming soon)\b|XXXX|\[\.\.\.\]/;
const PLACEHOLDER_CI = /\b(lorem ipsum|à compléter|coming soon)\b/i;

const entries = [];
for (const collection of ['articles', 'pages']) {
  for (const lang of LANGS) {
    const dir = path.join(ROOT, 'src/content', collection, lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, 'utf8');
      const { data, content } = matter(raw);
      entries.push({ collection, lang, file: path.relative(ROOT, full), data, content, raw });
    }
  }
}

const errors = [];
const warnings = [];
const err = (e, msg) => errors.push(`${e.file}: ${msg}`);
const warn = (e, msg) => warnings.push(`${e.file}: ${msg}`);

const slugsByLang = new Map();
for (const e of entries) {
  const { title = '', description = '', slug, translationKey, lang } = e.data;
  if (lang !== e.lang) err(e, `lang "${lang}" ≠ dossier "${e.lang}"`);
  if (title.length === 0 || title.length > 70) err(e, `titre de ${title.length} caractères (max 70)`);
  if (description.length < 50 || description.length > 160) err(e, `description de ${description.length} caractères (50-160)`);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) err(e, `slug invalide "${slug}"`);
  if (!translationKey) err(e, 'translationKey manquant');
  const key = `${e.lang}/${slug}`;
  if (slugsByLang.has(key)) err(e, `slug en double avec ${slugsByLang.get(key)}`);
  slugsByLang.set(key, e.file);
  if (PLACEHOLDER.test(e.raw) || PLACEHOLDER_CI.test(e.raw)) err(e, 'marqueur de placeholder détecté');
}

// Appariement des traductions fr/en (les autres langues sont facultatives pour l'instant)
for (const collection of ['articles', 'pages']) {
  const byKey = new Map();
  for (const e of entries.filter((x) => x.collection === collection)) {
    const k = e.data.translationKey;
    if (!byKey.has(k)) byKey.set(k, new Set());
    byKey.get(k).add(e.lang);
  }
  for (const [k, langs] of byKey) {
    for (const required of ['fr', 'en']) {
      if (!langs.has(required)) warnings.push(`${collection}: translationKey "${k}" sans version ${required}`);
    }
  }
}

// Liens internes
const known = new Set(entries.map((e) => `/${e.lang}/${e.data.slug}`));
const staticRoutes = ['/', ...LANGS.flatMap((l) => [`/${l}`])];
for (const e of entries) {
  for (const m of e.content.matchAll(/\]\((\/[^)\s#]*)/g)) {
    const url = m[1].replace(/\/$/, '') || '/';
    if (staticRoutes.includes(url)) continue;
    if (/^\/(en|fr|es|de|ar)\/(topics|themes|temas|themen|mawadi)\//.test(url)) continue;
    if (!known.has(url)) err(e, `lien interne cassé ${m[1]}`);
  }
}

for (const w of warnings) console.warn('⚠️ ', w);
for (const x of errors) console.error('❌', x);
console.log(`\n${entries.length} fichiers contrôlés · ${errors.length} erreur(s) · ${warnings.length} avertissement(s)`);
process.exit(errors.length ? 1 : 0);
