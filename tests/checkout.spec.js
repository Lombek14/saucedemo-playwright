import { test, expect } from '@playwright/test';
//import { login } from './helpers/auth.js';
test.use({ storageState: 'storageState.json' });

test('Checkout flow: add to cart → finish order', async ({ page }) => {
  // Log in
  //await login(page);

  // Start already authenticated on inventory page
  await page.goto('/inventory.html');  // ✅ you’re already authenticated

  // Add item and go to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');

  // Start checkout
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Mahoula');
  await page.fill('[data-test="lastName"]', 'Dosso');
  await page.fill('[data-test="postalCode"]', '73301');
  await page.click('[data-test="continue"]');

  // Verify overview
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');
  await expect(page.locator('.inventory_item_name'))
    .toContainText('Sauce Labs Backpack');

  // Finish and validate success
  await page.click('[data-test="finish"]');
  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');

  // (optional) back home and log out
  await page.click('[data-test="back-to-products"]');
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
});
