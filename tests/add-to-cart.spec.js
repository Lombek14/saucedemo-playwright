import { test, expect } from '../fixtures/authenticatedPage.js';
import { InventoryPage } from '../pages/InventoryPage';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

test('@smoke Add item to cart', async ({ authPage }) => {
  const page = authPage;

  const inv = new InventoryPage(page);
  await inv.addBackpackToCart();
  await inv.addBikeLightToCart();
  await inv.openCart();

  await expect(page.locator('.cart_item')).toHaveCount(2); // Verify items added to cart

  //validate the 2 items are in the cart
  const itemNames = page.locator('.cart_item .inventory_item_name');
  await expect(itemNames.nth(0)).toHaveText('Sauce Labs Backpack');
  await expect(itemNames.nth(1)).toHaveText('Sauce Labs Bike Light');
}); 
