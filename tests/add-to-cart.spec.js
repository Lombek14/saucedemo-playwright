
//import { test, expect } from '@playwright/test';
import { ensureInventory } from './helpers/inventory.js';

// ----- helpers (only defined once in this file) -----

async function login(page) {
  await page.locator('#user-name').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
}

async function ensureInventory(page, { isWebKit } = {}) {
  await page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });

  const { pathname } = new URL(page.url());
  if (pathname === '/') {
    await login(page);
    await expect(page).toHaveURL(/inventory\.html/, { timeout: 15_000 });
  }

  if (isWebKit) await page.waitForLoadState('networkidle');

  await page.getByTestId('add-to-cart-sauce-labs-backpack')
    .waitFor({ state: 'visible', timeout: isWebKit ? 12_000 : 8_000 });
}

async function resetAppState(page) {
  const wrap    = page.locator('.bm-menu-wrap');
  const openBtn = page.locator('#react-burger-menu-btn');
  const closeBtn= page.locator('#react-burger-cross-btn');

  const isOpen = (await wrap.getAttribute('aria-hidden').catch(() => null)) === 'false';
  if (!isOpen) {
    await openBtn.waitFor({ state: 'visible' });
    await openBtn.click();
    await expect(wrap).toBeVisible({ timeout: 8_000 });
  }

  await page.getByRole('link', { name: 'Reset App State' }).click();
  if (await closeBtn.isVisible().catch(() => false)) await closeBtn.click();
}

// ----- test -----

test('@regression Add product to cart', async ({ page }, testInfo) => {
  const isWebKit = testInfo.project.name.toLowerCase().includes('webkit');
  if (isWebKit) test.slow();

  await ensureInventory(page, { isWebKit });
  await resetAppState(page);
 
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
 
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
 
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});
