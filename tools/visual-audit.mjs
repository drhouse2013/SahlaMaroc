/**
 * Audit visuel de l'accueil : capture à 1448 × 1024, comparaison pixel à pixel avec la maquette.
 * Prérequis : `npx astro preview --port 4331` (ou PLAYWRIGHT_BASE_URL).
 * Sorties : visual-audit/{reference,current,diff}.png + rapport JSON dans la console.
 */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdir, copyFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://[::1]:4331';
const out = 'visual-audit';
const ZIP_REF = process.env.TEMPLATE_REF ?? 'C:/Users/Diniz/AppData/Local/Temp/SahlaTpl/SahlaMaroc_Template_Complete/public/assets/reference/capture-originale.png';
const W = 1448;
const H = 1024;

await mkdir(out, { recursive: true });
if (!existsSync(`${out}/reference.png`) && existsSync(ZIP_REF)) await copyFile(ZIP_REF, `${out}/reference.png`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, colorScheme: 'light', locale: 'fr-FR', reducedMotion: 'reduce' });
// Aucune préférence de thème forcée : on vérifie le rendu par défaut (clair) comme un premier visiteur.
await page.goto(`${base}/fr`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
// Neutralise les animations et le défilement pour une capture stable.
await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}' });
await page.waitForTimeout(400);
await page.screenshot({ path: `${out}/current.png` });

const boxes = await page.evaluate(() => {
  const sels = {
    header: '.tpl-header', hero: '.tpl-hero', heroTitle: '.tpl-hero h1', heroIntro: '.tpl-hero__intro',
    search: '.tpl-search', benefits: '.tpl-benefits', features: '.tpl-features', feature0: '.tpl-feature',
    tools: '.tpl-tools', toolsGrid: '.tpl-tools__grid', tool0: '.tpl-tool',
    guides: '.tpl-guides', guide0: '.tpl-guide', dest: '.tpl-destinations', dest0: '.tpl-dest',
    checklist: '.tpl-checklist',
  };
  const r = {};
  for (const [k, sel] of Object.entries(sels)) {
    const el = document.querySelector(sel);
    if (!el) { r[k] = null; continue; }
    const b = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    r[k] = { x: Math.round(b.x), y: Math.round(b.y + scrollY), w: Math.round(b.width), h: Math.round(b.height), bg: cs.backgroundColor, color: cs.color, font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight };
  }
  return r;
});

// Diff pixel à pixel (seuil 24 par canal) + image amplifiée.
const refRaw = await sharp(`${out}/reference.png`).extract({ left: 0, top: 0, width: W, height: H }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const curRaw = await sharp(`${out}/current.png`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { data: A, info } = refRaw;
const { data: B } = curRaw;
const px = info.width * info.height;
const diff = Buffer.alloc(px * 3);
let sum = 0, changed = 0;
const bandH = 1;
const rows = new Array(info.height).fill(0);
for (let i = 0; i < px; i++) {
  const o = i * 3;
  const d = Math.abs(A[o] - B[o]) + Math.abs(A[o + 1] - B[o + 1]) + Math.abs(A[o + 2] - B[o + 2]);
  sum += d / 3;
  if (d > 24) { changed++; rows[i % info.height]++; }
  const v = Math.min(255, d);
  diff[o] = v; diff[o + 1] = v > 60 ? v - 40 : 0; diff[o + 2] = 0;
}
await sharp(diff, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toFile(`${out}/diff.png`);

// Regroupement par bandes de 50 px pour cibler les écarts.
const bands = [];
for (let y = 0; y < info.height; y += 50) {
  let c = 0;
  for (let yy = y; yy < Math.min(y + 50, info.height); yy++) c += rows[yy];
  bands.push({ y, changedPct: +(100 * c / (W * 50)).toFixed(1) });
}
console.log(JSON.stringify({
  viewport: { W, H },
  meanAbsDiff: +(sum / px).toFixed(2),
  changedPct: +(100 * changed / px).toFixed(2),
  worstBands: bands.sort((a, b) => b.changedPct - a.changedPct).slice(0, 8),
  boxes,
}, null, 2));
await browser.close();
