
import { test, expect } from '@playwright/test';
//import { login } from './helpers/auth.js';

// 👇 This enables parallel tests within this file
test.describe.configure({ mode: 'parallel' });

test('Add product to cart', async ({ page }) => {
  //await login(page); // uses your helper
  await page.goto('/inventory.html');  // ✅ you’re already authenticated
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.inventory_item_name'))
    .toContainText('Sauce Labs Backpack');
});
