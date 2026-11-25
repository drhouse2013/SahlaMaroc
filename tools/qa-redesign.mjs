import { chromium } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const out = '../outputs/antigravity-20261124/visual';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const dist = normalize('dist');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2' };
for (const [name, path] of [
  ['home', '/fr'],
  ['guides', '/fr/guides'],
  ['demarches', '/fr/demarches'],
  ['investir', '/fr/investir-au-maroc'],
  ['visiter', '/fr/visiter-le-maroc'],
  ['outils', '/fr/calculateurs'],
  ['article', '/fr/retour-definitif-maroc-mre-guide'],
  ['city', '/fr/villes/marrakech'],
  ['calculator', '/fr/convertisseur-euro-dirham'],
  ['cities-index', '/fr/villes'],
  ['regions-index', '/fr/regions'],
  ['checklists-index', '/fr/checklists'],
  ['pillar', '/fr/themes/retour-au-bled'],
  ['pillar-ar', '/ar/mawadi/al-awda'],
  ['glossary', '/fr/glossaire'],
  ['cities-index-ar', '/ar/mudun'],
  ['guides-ar', '/ar/adilla'],
  ['demarches-ar', '/ar/ijraat'],
  ['investir-ar', '/ar/al-istithmar-fi-al-maghrib'],
  ['visiter-ar', '/ar/ziyarat-al-maghrib'],
  ['outils-ar', '/ar/al-hasibat'],
  ['article-ar', '/ar/al-awda-al-nihaiya-ila-al-maghrib-mre'],
].filter(([name]) => !process.argv[2] || name === process.argv[2])) {
  for (const [device, viewport] of [
    ['desktop', { width: 1440, height: 900 }],
    ['mobile', { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    await page.route('**/*', async route => {
      const requested = new URL(route.request().url());
      if (requested.hostname !== 'sahla.local') return route.abort();
      const relative = decodeURIComponent(requested.pathname).replace(/^\/+/, '');
      const file = join(dist, relative, extname(relative) ? '' : 'index.html');
      try {
        const body = await readFile(file);
        await route.fulfill({ status: 200, contentType: mime[extname(file)] ?? 'application/octet-stream', body });
      } catch {
        await route.fulfill({ status: 404, body: 'Not found' });
      }
    });
    const response = await page.goto(`http://sahla.local${path}`, { waitUntil: 'networkidle' });
    if (response?.status() !== 200) throw new Error(`${path}: HTTP ${response?.status()}`);
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < pageHeight; y += viewport.height) {
      await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(120);
    const title = await page.title();
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const broken = await page.locator('img').evaluateAll(images => images.filter(image => image.complete && image.naturalWidth === 0 && image.loading !== 'lazy').map(image => image.getAttribute('src')));
    const undersized = await page.locator('img').evaluateAll(images => images.filter(image => image.complete && image.naturalWidth > 0 && image.getBoundingClientRect().width >= 80 && image.naturalWidth < image.getBoundingClientRect().width * .9).map(image => ({ src: image.currentSrc, naturalWidth: image.naturalWidth, displayWidth: Math.round(image.getBoundingClientRect().width) })));
    await page.screenshot({ path: `${out}/${name}-${device}.png`, fullPage: true });
    console.log(JSON.stringify({ name, device, status: response?.status(), title, horizontalOverflow, brokenCount: broken.length, broken: broken.slice(0, 3), undersizedCount: undersized.length, undersized: undersized.slice(0, 3) }));
    if (!title || horizontalOverflow || broken.length || undersized.length) throw new Error(`${name} ${device}: failed visual smoke check`);
    await page.close();
  }
}
await browser.close();
