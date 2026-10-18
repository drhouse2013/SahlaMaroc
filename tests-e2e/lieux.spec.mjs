import { test, expect } from '@playwright/test';

test('fiche ville : section Lieux à visiter (si données) sans erreur', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/fr/villes/marrakech');
  await expect(page.locator('h1')).toBeVisible();
  const sec = page.locator('#spots');
  if (await sec.count()) {
    expect(await sec.locator('[data-spot]').count()).toBeGreaterThan(0);
    await expect(sec.locator('h2')).toHaveText(/^Lieux à visiter \(\d+\)$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});
