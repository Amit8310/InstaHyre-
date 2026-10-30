const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class InstahyreLoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.loginLink = 'Log in here';
        this.continueWithEmailLink = 'Continue with email';
        this.loginForm = this.page.locator('form:has(#email)');
        this.emailInput = this.loginForm.getByRole('textbox', { name: 'Email', exact: true });
        this.passwordInput = this.loginForm.getByRole('textbox', { name: 'Password', exact: true });
        this.loginButton = this.loginForm.getByRole('button', { name: /Log in/ });
    }

    async open(baseUrl) {
        await this.navigate(baseUrl);
    }

    async continueToLogin() {
        await this.page.getByRole('link', { name: this.continueWithEmailLink }).click();
        await this.page.getByRole('link', { name: this.loginLink }).click();
    }

    async login(username, password) {
        await this.emailInput.click();
        await this.emailInput.press('Control+A');
        await this.emailInput.pressSequentially(username, { delay: 100 });
        await expect(this.emailInput).toHaveValue(username);
        await this.passwordInput.click();
        await this.passwordInput.press('Control+A');
        await this.passwordInput.pressSequentially(password, { delay: 100 });
        await expect(this.passwordInput).toHaveValue(password);
        await expect(this.emailInput).toHaveValue(username);
        await this.loginButton.click();
    }
}

module.exports = InstahyreLoginPage;
