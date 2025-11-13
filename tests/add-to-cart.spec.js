// tests/add-to-cart.spec.js
import { test, expect } from '@playwright/test';
import { login } from './helpers/auth.js';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

test('Add product to cart', async ({ page }) => {
  await login(page);                                 // <- log in first
  await page.goto('/inventory.html');                // (safe & explicit)

  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');

  await expect(page.locator('.inventory_item_name'))
    .toContainText('Sauce Labs Backpack');
});
