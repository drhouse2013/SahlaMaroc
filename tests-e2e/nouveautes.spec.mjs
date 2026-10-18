import { test, expect } from '@playwright/test';

test('hub Nouveautés : fil daté, filtres, sources, limites, liens guides', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/fr/nouveautes-administratives');
  await expect(page.locator('h1')).toContainText('Nouveautés');
  const items = page.locator('[data-news-list] > li');
  expect(await items.count()).toBeGreaterThanOrEqual(3);
  const loi = page.locator('#n-admin-sworn-statement-55-19');
  await expect(loi).toContainText('Rappel');
  await expect(loi).toContainText('Vérifié le');
  await expect(loi).toContainText('Ce qui change');
  await expect(loi).toContainText("n'est pas confirmée");
  await expect(loi.locator('a[href^="https://"]').first()).toBeVisible();
  await expect(loi.locator('a[href^="/fr/"]').first()).toBeVisible();
  // filtre par thème
  await page.locator('[data-news-filters] button[data-theme="travel"]').click();
  await expect(loi).toBeHidden();
  await expect(page.locator('#n-legal-time-gmt')).toBeVisible();
  await page.locator('[data-news-filters] button[data-theme="all"]').click();
  await expect(loi).toBeVisible();
  expect(errors).toEqual([]);
});

test('guide lié : renvoi vers la nouveauté', async ({ page }) => {
  await page.goto('/fr/importer-voiture-retour-definitif-maroc');
  await expect(page.locator('a[href*="/fr/nouveautes-administratives#n-temp-import-car-180"]')).toBeVisible();
});
