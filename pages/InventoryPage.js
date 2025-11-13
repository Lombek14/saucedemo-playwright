export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.cart = '.shopping_cart_link';
    }
    async addBackpackToCart() {
        await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    }
    async openCart() {
        await this.page.click(this.cart);
    }
}