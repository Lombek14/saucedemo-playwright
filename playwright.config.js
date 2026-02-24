// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

// Resolve BASE_URL from environment, fall back to saucedemo
const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com/';

// Production guard: block accidental runs against production mahovastore.com
if (
  /mahovastore\.com/i.test(BASE_URL) &&
  !/staging|dev|localhost/i.test(BASE_URL)
) {
  throw new Error(
    `🚨 Safety guard: BASE_URL "${BASE_URL}" points to production mahovastore.com. ` +
    `Set BASE_URL to a staging, dev, or localhost URL to run Mahovastore tests.`
  );
}

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  workers: '50%',
  expect: { timeout: 5000 },  // ✅ correct - object with timeout property
  grepInvert: /@mahovastore/,  // exclude Mahovastore tests by default; run with --grep @mahovastore
  reporter: [['html', { open: 'never' }]],  // HTML report (don't auto-open)

  use: {
    baseURL: BASE_URL,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,   //page.goto/redirects
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: process.env.CI ? 'on-first-retry' : 'off',
  },

  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit',   use: { ...devices['Desktop Safari'] } },
  ],
});
