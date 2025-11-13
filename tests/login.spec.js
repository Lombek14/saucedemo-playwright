// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { login } from './helpers/auth.js';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

test('Login works', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory\.html/);
});
