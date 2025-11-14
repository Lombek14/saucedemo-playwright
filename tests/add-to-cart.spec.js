import { test, expect } from '../fixtures/authenticatedPage.js';
import { InventoryPage } from '../pages/InventoryPage';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

test('Add item to cart', async ({ authPage }) => {
  const page = authPage;

    const inv = new InventoryPage(page);
    await inv.addBackpackToCart();
    await inv.openCart(); 

    await expect(page.locator('.cart_item')).toHaveCount(1); // Verify that the backpack is in the cart
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack'); // Verify the correct item is in the cart
}); 
