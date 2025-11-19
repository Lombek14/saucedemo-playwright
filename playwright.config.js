// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  fullyParallel: true,
  workers: '50%',
  expect: 5000, 
  reporter: [['html', { open: 'never' }]],  // HTML report (don’t auto-open)

  use: {
    baseURL: 'https://www.saucedemo.com/',
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
