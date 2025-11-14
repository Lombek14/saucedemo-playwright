// this to create a new fixture to authenticate the user before each test
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';


const test = base.extend({
    authPage : async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login();

        await use(page);
    }
});
export{ test, expect };