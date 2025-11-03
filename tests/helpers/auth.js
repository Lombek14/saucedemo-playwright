// tests/helpers/auth.js
export async function login(page) {
  // If we're already on inventory, skip UI login
  const { pathname } = new URL(page.url());
  if (pathname === '/inventory.html') return;

  // Perform UI login
  await page.locator('#user-name').fill('standard_user');                 // by id
  await page.locator('[data-test="password"]').fill('secret_sauce');     // by data-test
  await page.locator('[data-test="login-button"]').click();               // by data-test

  // land on inventory
  await page.waitForURL(/inventory\.html/);
  await page.waitForLoadState('networkidle');
}
