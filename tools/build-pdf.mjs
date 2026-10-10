#!/usr/bin/env node
/**
 * Génère les check-lists PDF « Retour d'été au Maroc » (fr, en, es, de, ar) dans public/downloads/.
 * Outil de développement lancé à la main : `node tools/build-pdf.mjs [fr en ...]`.
 * - Sources : tools/pdf/content.<lang>.mjs (textes) + tools/pdf/template.mjs (gabarit HTML/CSS commun).
 * - Rendu : Chromium via playwright-core (aucune dépendance ajoutée au package.json).
 *   Variables : PLAYWRIGHT_CORE (chemin du module), CHROMIUM_PATH (binaire), SITE_URL (pied de page).
 * - Les PDF générés sont COMMITÉS (le build Vercel ne génère pas de PDF). Relancer à chaque changement de texte.
 * - Les liens vers les guides sont lus dans les frontmatters (translationKey -> slug de la langue).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['fr', 'en', 'es', 'de', 'ar'];
const wanted = process.argv.slice(2).filter((a) => LANGS.includes(a));
const langs = wanted.length ? wanted : LANGS;

const { SITE_URL } = await import(pathToFileURL(path.join(ROOT, 'site.config.mjs')).href);
const { renderHtml } = await import('./pdf/template.mjs');
const brandName = (l) => (l === 'fr' ? 'Sahla Maroc' : 'Sahla Morocco'); // même règle que src/utils/seo.ts

function loadPlaywright() {
  const req = createRequire(import.meta.url);
  const candidates = [process.env.PLAYWRIGHT_CORE, 'playwright-core', '/opt/node-tools/node_modules/playwright-core'].filter(Boolean);
  for (const c of candidates) { try { return req(c); } catch { /* suivant */ } }
  throw new Error('playwright-core introuvable (définir PLAYWRIGHT_CORE).');
}
function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = '/opt/pw-browsers';
  if (fs.existsSync(base)) {
    for (const d of fs.readdirSync(base).filter((x) => x.startsWith('chromium-')).sort().reverse()) {
      const p = path.join(base, d, 'chrome-linux/chrome');
      if (fs.existsSync(p)) return p;
    }
  }
  return undefined; // laisse playwright chercher son navigateur par défaut
}

/** translationKey -> slug pour une langue (lecture du frontmatter, sans dépendance). */
function slugsFor(lang) {
  const dir = path.join(ROOT, 'src/content/articles', lang);
  const map = {};
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.mdx'))) {
    const head = fs.readFileSync(path.join(dir, f), 'utf8').split('---')[1] ?? '';
    const k = head.match(/^translationKey:\s*"([^"]+)"/m)?.[1];
    const s = head.match(/^slug:\s*"([^"]+)"/m)?.[1];
    if (k && s) map[k] = s;
  }
  return map;
}

// Polices : instances statiques (400 et 700) de Readex Pro (licence OFL), extraites des fichiers variables
// @fontsource-variable/readex-pro, dans tools/pdf/fonts/ (plus légères dans le PDF qu'une police variable).
const fontFile = (n) => pathToFileURL(path.join(ROOT, 'tools/pdf/fonts', n)).href;
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const ARABIC = 'U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0898-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC';
const fontCss = [['latin', 400, LATIN], ['latin', 700, LATIN], ['arabic', 400, ARABIC], ['arabic', 700, ARABIC]]
  .map(([n, w, r]) => `@font-face { font-family: Readex; font-weight: ${w}; src: url(${fontFile(`readex-pro-${n}-${w}.woff2`)}) format('woff2'); unicode-range: ${r}; }`).join('\n');

const { chromium } = loadPlaywright();
const browser = await chromium.launch({ executablePath: findChromium(), args: ['--no-sandbox'] });
const outDir = path.join(ROOT, 'public/downloads');
fs.mkdirSync(outDir, { recursive: true });
for (const lang of langs) {
  const c = (await import(`./pdf/content.${lang}.mjs`)).default;
  const slugs = slugsFor(lang);
  const guideLinks = c.guides.map(([key, label]) => {
    if (!slugs[key]) throw new Error(`[${lang}] guide introuvable pour translationKey=${key}`);
    return [`${SITE_URL}/${lang}/${slugs[key]}`, label];
  });
  const html = renderHtml({ c, lang, brand: brandName(lang), siteUrl: SITE_URL, guideLinks, fontCss });
  const tmp = path.join(outDir, `.tmp-${lang}.html`);
  fs.writeFileSync(tmp, html);
  const page = await browser.newPage();
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(outDir, `sahla-checklist-retour-ete-${lang}.pdf`);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await page.close();
  fs.unlinkSync(tmp);
  console.log(`[pdf] ${path.relative(ROOT, out)} ${(fs.statSync(out).size / 1024).toFixed(0)} Ko`);
}
await browser.close();
