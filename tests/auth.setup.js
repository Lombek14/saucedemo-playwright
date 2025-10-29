// tests/setup/auth.setup.js
import { chromium } from 'playwright';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // save cookies/localStorage to a file
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}
