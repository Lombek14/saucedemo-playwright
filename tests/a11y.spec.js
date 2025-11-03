// tests/a11y.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Known noisy rules on saucedemo UI we don't want to fail smoke on:
const IGNORE_RULES = new Set(['select-name', 'button-name']);

test.describe.configure({ mode: 'parallel' });

test('@a11y @smoke Inventory page has no critical/serious actionable a11y issues', async ({ page, browserName }) => {
  // Keep smoke a11y to Chromium for consistency/flakiness reasons
  test.skip(browserName !== 'chromium', 'A11y smoke runs on Chromium only');

  await page.goto('/inventory.html');

  const results = await new AxeBuilder({ page })
    .options({
      // Limit to core WCAG tags for a concise smoke
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      // Disable a couple of known noisy rules for this demo app
      rules: Object.fromEntries([...IGNORE_RULES].map(id => [id, { enabled: false }]))
    })
    .analyze();

  // Keep only critical/serious violations that are actionable (have any/all fixes)
  const actionable = results.violations
    .filter(v => (v.impact === 'critical' || v.impact === 'serious') && !IGNORE_RULES.has(v.id))
    .flatMap(v =>
      v.nodes
        .filter(n => (n.any && n.any.length) || (n.all && n.all.length))
        .map(n => ({ id: v.id, impact: v.impact, target: n.target }))
    );

  // If something still slips through, show the full axe payload to debug quickly
  expect.soft(
    actionable,
    JSON.stringify({ violations: results.violations }, null, 2)
  ).toHaveLength(0);
});
