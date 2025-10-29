import { test, expect } from '@playwright/test';

// 👇 This enables parallel tests within this file
test.describe.configure({ mode: 'parallel' });

test('Valid user can log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.title')).toHaveText('Products');
});
