// tests/helpers/auth.js
export async function login(page) {
  // Always start from home, then log in
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#user-name').fill('standard_user');              // by id
  await page.locator('[data-test="password"]').fill('secret_sauce');   // by data-test
  await page.locator('[data-test="login-button"]').click();
}
