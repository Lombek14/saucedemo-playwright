// tests/checkout.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

test('Complete checkout process', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inv = new InventoryPage(page);
    const checkout = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login();
    await inv.addBackpackToCart();
    await inv.openCart();

    await checkout.start();
    await checkout.fillForm();
    await checkout.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/); // Verify we are on the checkout complete page

    await checkout.expectSuccess();
    await checkout.backToHome();

});
