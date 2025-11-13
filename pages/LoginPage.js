export class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.user = '#user-name';
        this.pass = '#password';
        this.loginbtn = '#login-button';
    }
    async goto() {await this.page.goto('/');}
    async login(username = 'standard_user', password = 'secret_sauce') {
        await this.page.fill(this.user, username);
        await this.page.fill(this.pass, password);
        await this.page.click(this.loginbtn);
    }
}
