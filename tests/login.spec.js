import { test, expect } from '@playwright/test';

// 👇 This enables parallel tests within this file
test.describe.configure({ mode: 'parallel' });

test.use({ storageState: null });  // start without saved login

test('Login works', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
});
