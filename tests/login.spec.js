// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// Optional per-file parallel (global config is already parallel)
test.describe.configure({ mode: 'parallel' });

const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login();
await expect(page).toHaveURL(/inventory\.html/);

