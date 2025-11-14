// tests/checkout.spec.js
import { test, expect } from '../fixtures/authenticatedPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

test('Complete checkout process', async ({ authPage }) => {
    const inv = new InventoryPage(authPage);
    const checkout = new CheckoutPage(authPage);


    await inv.addBackpackToCart();
    await inv.openCart(); 
    await checkout.start();
    await checkout.fillForm();
    await checkout.finish();
    await expect(authPage).toHaveURL(/checkout-complete\.html/); // Verify we are on the checkout complete page

    await checkout.expectSuccess();
    await checkout.backToHome();

});
