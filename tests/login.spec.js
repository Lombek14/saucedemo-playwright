// tests/login.spec.js

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

test('@smoke valid user can log in', async ({ page }) => {
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.login();

await expect(page).toHaveURL(/inventory\.html/);
});

test('@negative invalid credentials show error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_password');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});
