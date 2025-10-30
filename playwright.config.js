// playwright.config.js
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';


// Load .env in local dev; CI will inject env vars
if (process.env.NODE_ENV !== 'production') {
  try { await import('dotenv').then(m => m.config()); } catch {}
}

export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/auth.setup.js',
  timeout: 60_000,
  retries: 1,
  fullyParallel: true,
  workers: 4,

  // HTML report (auto-opens after run)
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'https://www.saucedemo.com/',
    storageState: 'storageState.json', 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    testIdAttribute: 'data-test',
  },

  // Run the same tests on all 3 engines
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit',   use: { ...devices['Desktop Safari'] } },
  ],
});
