import { test, expect } from '@playwright/test';

// Lot 0 : hub Guides (parcours, filtres, recherche) et outils d'article (partage, impression, parcours).
const HUBS = { fr: 'guides', en: 'guides', ar: 'adilla' };

test.describe('hub Guides', () => {
  for (const lang of Object.keys(HUBS)) {
    test(`${lang} : parcours, filtre par thème et recherche`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`/${lang}/${HUBS[lang]}`);
      if (lang !== 'ar') await expect(page.locator('[data-journeys] > li').first()).toBeVisible();
      const total = await page.locator('[data-guide]').count();
      expect(total).toBeGreaterThan(0);

      // Filtre par thème
      const chips = page.locator('button[data-cat]:not([data-cat=""])');
      await chips.first().click();
      await expect(chips.first()).toHaveAttribute('aria-pressed', 'true');
      const filtered = await page.locator('[data-guide]:not([hidden])').count();
      expect(filtered).toBeGreaterThan(0);
      expect(filtered).toBeLessThanOrEqual(total);
      await page.locator('button[data-cat=""]').click();
      expect(await page.locator('[data-guide]:not([hidden])').count()).toBe(total);

      // Recherche : un mot du titre d'une carte, puis un mot introuvable
      const word = ((await page.locator('[data-guide] h3').first().innerText()).match(/[\p{L}]{5,}/u) ?? ['a'])[0];
      await page.locator('[data-search]').fill(word);
      const hits = await page.locator('[data-guide]:not([hidden])').count();
      expect(hits).toBeGreaterThan(0);
      await expect(page.locator('[data-status]')).not.toBeEmpty();
      await page.locator('[data-search]').fill('zzzzqxj');
      await expect(page.locator('[data-empty]')).toBeVisible();
      await page.locator('[data-reset]').click();
      await expect(page.locator('[data-empty]')).toBeHidden();
      expect(await page.locator('[data-guide]:not([hidden])').count()).toBe(total);
      expect(errors).toEqual([]);
    });
  }

  test('mobile 360 : pas de défilement horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/fr/guides');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});

test.describe('page guide', () => {
  test('partage, impression et navigation de parcours', async ({ page }) => {
    await page.goto('/fr/guides');
    const first = page.locator('[data-journeys] > li').first().locator('ol a').first();
    const href = await first.getAttribute('href');
    await page.goto(href);
    const wa = page.locator('[data-article-actions] a[href^="https://wa.me/"]');
    await expect(wa).toBeVisible();
    expect(decodeURIComponent(await wa.getAttribute('href'))).toContain('/fr/');
    await expect(page.locator('[data-print]')).toBeVisible();
    await expect(page.locator('[data-copy]')).toBeVisible();
    // Premier guide du parcours : « suivant » seulement
    const nav = page.locator('[data-journey-nav]');
    await expect(nav.locator('a[rel="next"]')).toBeVisible();
    await expect(nav.locator('a[rel="prev"]')).toHaveCount(0);
    await nav.locator('a[rel="next"]').click();
    await expect(page.locator('[data-journey-nav] a[rel="prev"]')).toBeVisible();
  });

  test('sans champs facultatifs : ni « En bref » ni FAQ vides', async ({ page }) => {
    await page.goto('/fr/guides');
    const href = await page.locator('[data-journeys] > li').first().locator('ol a').first().getAttribute('href');
    await page.goto(href);
    const faq = await page.locator('[data-faq]').count();
    const ld = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    expect(ld.some((x) => x.includes('FAQPage'))).toBe(faq > 0);
  });

  test('impression : navigation, partage et pied masqués', async ({ page }) => {
    await page.goto('/fr/guides');
    const href = await page.locator('[data-journeys] > li').first().locator('ol a').first().getAttribute('href');
    await page.goto(href);
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('[data-article-actions]')).toBeHidden();
    await expect(page.locator('footer').first()).toBeHidden();
    await expect(page.locator('h1')).toBeVisible();
  });
});
