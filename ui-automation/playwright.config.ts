import { defineConfig, devices } from '@playwright/test';

/**
 * Each spec file under tests/ is fully independent (it logs in itself and
 * creates its own test data), so it can be run alone:
 *   npx playwright test tests/login.spec.ts
 * or all four can be run together, sequentially, as one suite:
 *   npx playwright test
 *
 * fullyParallel is false and workers = 1 so the four scenarios never race
 * against each other on the shared demo environment / shared test data.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
