/**
 * Captures Playwright pour comparer le rendu à la maquette.
 * Prérequis : `npm run build` puis `npx astro preview --port 4331` (ou PLAYWRIGHT_BASE_URL).
 * Usage : node tools/shoot.mjs [chemin ...]
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4331';
const out = 'docs/rendu';
const paths = process.argv.slice(2);
const targets = paths.length
  ? paths
  : ['/fr', '/en', '/fr/guides', '/fr/checklists', '/fr/recherche', '/fr/villes/marrakech'];

const viewports = [
  { name: 'desktop', width: 1448, height: 1086 },
  { name: 'tablette', width: 900, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, locale: 'fr-FR', deviceScaleFactor: 1, colorScheme: process.env.SHOOT_DARK ? 'dark' : 'light' });
  const page = await context.newPage();
  for (const path of targets) {
    const url = base + path;
    try {
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(350);
      const name = `${process.env.SHOOT_FULL ? 'full-' : ''}${vp.name}${path.replace(/\//g, '_') || '_'}.png`;
      await page.screenshot({ path: `${out}/${name}`, fullPage: Boolean(process.env.SHOOT_FULL) });
      console.log(`${res?.status()} ${vp.name} ${path} -> ${out}/${name}`);
    } catch (error) {
      console.log(`ERREUR ${vp.name} ${path} : ${error.message}`);
    }
  }
  await context.close();
}
await browser.close();
