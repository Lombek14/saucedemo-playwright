// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

// Build a proxy object only when CI injects proxy envs
function webProxyFromEnv() {
  const server = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (!server) return undefined; // direct connection
  return {
    server,
    bypass: process.env.NO_PROXY || 'localhost,127.0.0.1,.saucedemo.com',
    username: process.env.PROXY_USER, // optional
    password: process.env.PROXY_PASS, // optional
  };
}

export default defineConfig({
  testDir: './tests',

  // CI-friendly defaults
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  timeout: 60_000,

  reporter: [['html', { open: 'never' }]],

  // Shared defaults for all projects
  use: {
    // 👇 baseURL fixes `page.goto('/')` by providing a host
    baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',

    // keep if you generate this via global setup; otherwise comment it out
    storageState: 'storageState.json',

    // useful artifacts
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        proxy: webProxyFromEnv(),
      },
    },
    {
      name: 'Firefox',
      // If your a11y smoke is flaky on Firefox, uncomment to skip:  grepInvert: /@a11y/,
      use: {
        ...devices['Desktop Firefox'],
        proxy: webProxyFromEnv(),
      },
    },
    {
      name: 'WebKit',
      // If a11y is flaky on WebKit, you can skip with:  grepInvert: /@a11y/,
      use: {
        ...devices['Desktop Safari'],
        proxy: webProxyFromEnv(), // undefined => DIRECT
      },
    },
  ],
});
