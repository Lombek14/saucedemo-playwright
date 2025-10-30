
import { test, expect } from '@playwright/test';


// Run specs in parallel (safe here)
test.describe.configure({ mode: 'parallel' });

/** ---- helpers ---- **/

// Make sure we're really on /inventory.html and the grid is painted.
// If redirected to "/", perform a UI login first.
async function ensureInventory(page, { isWebKit }) {
  await page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });

  const { pathname } = new URL(page.url());
  if (pathname === '/') {
    await page.getByTestId('user-name').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/inventory\.html/, { timeout: 15_000 });
  }

  // Give the page a moment to settle
  await page.waitForLoadState('networkidle');

  const timeout = isWebKit ? 12_000 : 8_000;

  // If the grid's first item isn't visible yet, refresh once.
  const firstItem = page.locator('.inventory_list .inventory_item').first();
  if (!(await firstItem.isVisible().catch(() => false))) {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
  }

  await firstItem.waitFor({ state: 'visible', timeout });

  // Ensure the target button is actually interactable before clicking later
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').waitFor({
    state: 'visible',
    timeout,
  });
}

// Robustly reset the app state via the burger menu.
// Works whether the menu is open or closed initially.
async function resetAppState(page) {
  const openBtn = page.locator('#react-burger-menu-btn');
  const closeBtn = page.locator('#react-burger-cross-btn');
  const menuWrap = page.locator('.bm-menu-wrap');

  // aria-hidden="false" means menu is open
  const ariaHidden = await menuWrap.getAttribute('aria-hidden').catch(() => null);
  const isOpen = ariaHidden === 'false';

  if (!isOpen) {
    await openBtn.waitFor({ state: 'visible' });
    await openBtn.click();
    await expect(menuWrap).toBeVisible({ timeout: 8_000 });
  }

  await page.getByRole('link', { name: 'Reset App State' }).click();

  // Best-effort close
  if (await closeBtn.isVisible().catch(() => false)) {
    await closeBtn.click().catch(() => {});
  }
}

/** ---- test ---- **/

test('@regression Add product to cart', async ({ page }, testInfo) => {
  const isWebKit = testInfo.project.name.toLowerCase().includes('webkit');
  if (isWebKit) test.slow(); // give WebKit more budget

  await ensureInventory(page, { isWebKit });
  await resetAppState(page);

  // Add "Sauce Labs Backpack"
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Badge shows "1"
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

  // Open cart and assert the item is there
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});
