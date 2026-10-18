import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests-e2e',
  timeout: 30000,
  workers: 2,
  use: { baseURL: 'http://localhost:4331', locale: 'fr-FR' },
  // Sert dist/ : lancer `npm run build` avant.
  webServer: { command: 'npx astro preview --port 4331', url: 'http://localhost:4331/fr', reuseExistingServer: true, timeout: 60000 },
});
