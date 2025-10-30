import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getAxeResults, configureAxe } from 'axe-playwright';

const IGNORE_RULES = new Set(['select-name']); // ignore the SauceDemo sort <select> issue

test('@a11y @smoke Inventory page has no critical/serious actionable a11y issues', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForURL('**/inventory.html');

  await injectAxe(page);

  // optional: still run only WCAG A/AA, you can keep/remove this
  await configureAxe(page, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
  });

  const results = await getAxeResults(page);

  // high-severity & actionable, minus ignored rule IDs
  const actionable = results.violations.filter(v =>
    (v.impact === 'critical' || v.impact === 'serious') &&
    !IGNORE_RULES.has(v.id) &&
    v.nodes.some(n => n.any.length || n.all.length)
  );

  // uncomment if you want to see what’s still failing during tuning:
  // console.log(JSON.stringify(actionable, null, 2));

  // Fail only on high-severity actionable violations (after ignore list)
  expect(actionable, JSON.stringify(actionable, null, 2)).toHaveLength(0);
});
