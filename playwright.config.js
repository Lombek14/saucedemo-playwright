// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 1,
  fullyParallel: true,
  workers: 4,

  // HTML report (auto-opens after run)
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // Run the same tests on all 3 engines
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit',   use: { ...devices['Desktop Safari'] } },
  ],
});
