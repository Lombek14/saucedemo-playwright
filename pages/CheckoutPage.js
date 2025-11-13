import { expect } from '@playwright/test';
export class CheckoutPage {
    constructor(page) {
        this.page = page;
    }
    async start() { await this.page.click('[data-test="checkout"]'); }
    async fillForm(firstName ='Junior', lastName = 'QA Engineer', zipCode = '73301') {
        await this.page.fill('[data-test="firstName"]', firstName);
        await this.page.fill('[data-test="lastName"]', lastName);
        await this.page.fill('[data-test="postalCode"]', zipCode);
        await this.page.click('[data-test="continue"]');
    }
    
    async finish() { await this.page.click('[data-test="finish"]'); }
    async expectSuccess(message = 'Thank you for your order!') {
        const successMessage = this.page.locator('[data-test="checkout-complete-container"]');
        await expect(successMessage).toContainText(message);}
    async backToHome() { await this.page.click('[data-test="back-to-products"]');}      
}

