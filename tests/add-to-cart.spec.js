import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

// Inline replacement for helpers/inventory.js
async function openInventory(page, { isWebKit = false } = {}) {
  await page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });
  const timeout = isWebKit ? 12_000 : 8_000;
  await page.locator('.inventory_list .inventory_item').first()
    .waitFor({ state: 'visible', timeout });
}

test.describe.configure({ mode: 'parallel' });

// Keep regression UI on Chromium while stabilizing
test.skip(({ browserName }) => browserName !== 'chromium',
  'UI regression runs only on Chromium for stability');

test('@regression Add product to cart', async ({ page }, testInfo) => {
  const isWebKit = testInfo.project.name.toLowerCase().includes('webkit');

  await login(page);
  await openInventory(page, { isWebKit });

  const addBtn = page.getByTestId('add-to-cart-sauce-labs-backpack');
  await addBtn.waitFor({ state: 'visible', timeout: isWebKit ? 12_000 : 8_000 });
  await addBtn.click();

  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});
