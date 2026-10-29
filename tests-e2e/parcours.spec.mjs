import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync, existsSync } from 'node:fs';

// Pages FR contenant un calculateur, découvertes dans dist/.
const calcPages = readdirSync('dist/fr', { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(`dist/fr/${d.name}/index.html`))
  .filter((d) => readFileSync(`dist/fr/${d.name}/index.html`, 'utf8').includes('data-calc='))
  .map((d) => d.name);

const NEG = /(^|[^\d\w])[-−]\s?\d/;

for (const slug of calcPages) {
  test.describe(`calculateur ${slug}`, () => {
    const big = (page) => page.locator('[data-calc] .calc-result .big').first();
    const nums = (page) => page.locator('[data-calc] input[type="number"]');

    test('valeurs par défaut, négatif, vide, virgule', async ({ page }) => {
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`/fr/${slug}`);
      await expect(page.locator('[data-calc]').first()).toBeVisible();
      if (await big(page).count()) expect((await big(page).innerText()).trim().length).toBeGreaterThan(0);
      const n = await nums(page).count();
      if (n) {
        // négatif : jamais de résultat négatif
        for (let i = 0; i < n; i++) { const el = nums(page).nth(i); if (await el.isVisible()) await el.fill('-5'); }
        if (await big(page).count()) expect(await big(page).innerText()).not.toMatch(NEG);
        // vide
        for (let i = 0; i < n; i++) { const el = nums(page).nth(i); if (await el.isVisible()) await el.fill(''); }
        if (await big(page).count()) expect(await big(page).innerText()).not.toMatch(/NaN|undefined|Infinity/);
        // virgule décimale (locale fr-FR)
        const first = nums(page).first();
        await first.fill('');
        await first.pressSequentially('1000,5');
        if (await big(page).count()) expect(await big(page).innerText()).not.toMatch(/NaN|undefined|Infinity/);
      }
      expect(errors).toEqual([]);
    });
  });
}

test('404 français', async ({ page }) => {
  await page.goto('/fr/xyz-introuvable');
  await expect(page.locator('html')).toHaveAttribute('lang', /^fr/);
  await expect(page.locator('html')).not.toHaveAttribute('dir', 'rtl');
});

test('404 arabe en rtl', async ({ page }) => {
  await page.goto('/ar/xyz-introuvable');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', /^ar/);
});

test('recherche', async ({ page }) => {
  await page.goto('/fr');
  await page.locator('[data-search-open]').first().click();
  const input = page.locator('#search-input-dialog');
  await expect(input).toBeVisible();
  await input.fill('visa');
  await expect(page.locator('#search-dialog [data-search-results] a').first()).toBeVisible({ timeout: 10000 });
});

test('newsletter : champ piège et e-mail invalide', async ({ page }) => {
  await page.goto('/fr');
  const form = page.locator('form[data-newsletter]').first();
  // Règle actuelle : sans fournisseur ni endpoint, pas de formulaire (téléchargement PDF direct, voir DECISIONS_LOG).
  test.skip((await form.count()) === 0, 'newsletter non configurée : formulaire volontairement absent');
  await form.scrollIntoViewIfNeeded();
  await form.locator('input[type="email"]').fill('pas-un-email');
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('[role="status"]').first()).not.toBeEmpty();
  // champ piège rempli : rien n'est envoyé (pas de navigation mailto, message inchangé)
  await form.locator('input[type="email"]').fill('a@example.com');
  await form.locator('input[name="company"]').evaluate((el) => { el.value = 'bot'; });
  const before = await form.locator('[role="status"]').first().innerText();
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('[role="status"]').first()).toHaveText(before);
  await expect(form.locator('[data-pdf-gift]')).toBeHidden();
});

test.describe('mobile 360', () => {
  test.use({ viewport: { width: 360, height: 740 } });
  test('navigation mobile, pas de défilement horizontal', async ({ page }) => {
    await page.goto('/fr');
    const nav = page.locator('nav.fixed.bottom-0').first();
    await expect(nav).toBeVisible();
    const link = nav.locator('a').first();
    await link.click();
    await expect(page).toHaveURL(new RegExp("/fr(/|$)"));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test('aucune erreur console sur les pages clés', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  for (const u of ['/fr', '/en', '/ar', '/fr/calculateurs', `/fr/${calcPages[0]}`]) await page.goto(u);
  expect(errors.filter((e) => !/favicon|adsbygoogle|googlesyndication|net::ERR/i.test(e))).toEqual([]);
});
