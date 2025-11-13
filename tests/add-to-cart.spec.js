// tests/add-to-cart.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

test('Add backpack to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inv = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login();
  await inv.addBackpackToCart();  
  await inv.openCart();

  await expect(page).toHaveURL(/cart\.html/);   // Verify we are on the cart page
  await expect(page.locator('.cart_item')).toHaveCount(1); // Verify one item in cart

  // Verify the correct item is in the cart
  await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack'); 
});
