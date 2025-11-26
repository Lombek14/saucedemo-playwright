import { test, expect } from '../fixtures/authenticatedPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import customerData from '../test-data/customerData.json' assert { type: 'json' };


test.describe('Complete checkout process (data-driven)', () => {
  for (const customer of customerData) {

    test(`@regression Checkout for ${customer.firstName} ${customer.lastName}`, async ({ authPage }) => {
      
      const inv = new InventoryPage(authPage);
      const checkout = new CheckoutPage(authPage);

      // Add item and go to cart
      await inv.addBackpackToCart();
      await inv.addBikeLightToCart();
      await inv.openCart();


      // Start checkout and fill form using JSON data
      await checkout.start();
      await checkout.fillForm(customer.firstName, customer.lastName, customer.zipCode);

      // Finish order
      await checkout.finish();

      // Verify success
      await expect(authPage).toHaveURL(/checkout-complete\.html/);
      await checkout.expectSuccess();

      // Back home
      await checkout.backToHome();
    });

  }
});
