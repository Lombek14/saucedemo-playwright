// tests/a11y.spec.js
import { test, expect } from '@playwright/test';
import { injectAxe } from 'axe-playwright';

// Run a11y smoke only on Chromium for CI stability (WebKit differs here)
test.skip(({ browserName }) => browserName !== 'chromium', 'A11y smoke runs on Chromium only');

test('@a11y @smoke Inventory page has no critical/serious actionable a11y issues', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.waitForLoadState('networkidle');

  // axe-core available on the page
  await injectAxe(page);

  // Run axe but ignore the SauceDemo sort <select> naming rule (no label there)
  const results = await page.evaluate(async () => {
    // window.axe is injected by injectAxe
    return await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      rules: { 'select-name': { enabled: false } }
    });
  });

  // Fail only on high-severity actionable violations (critical/serious)
  const actionable = results.violations.filter(v => ['critical', 'serious'].includes(v.impact ?? ''));
  expect(actionable, JSON.stringify(actionable, null, 2)).toHaveLength(0);
});
