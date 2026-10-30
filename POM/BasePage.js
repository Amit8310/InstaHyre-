class BasePage {
    constructor(page) {
        this.page = page;
    }

    async click(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }
    async hover(selector){
        await this.page.hover(selector)
    }

    async type(selector, text) {
        await this.page.waitForSelector(selector);
        await this.page.type(selector, text);
    }
    async getText(selector) {
        await this.page.waitForSelector(selector);
        return await this.page.textContent(selector);
    }
    async isVisible(selector) {
        await this.page.waitForSelector(selector);
        return await this.page.isVisible(selector);
    }
    async waitForSelector(selector) {
        await this.page.waitForSelector(selector);
    }
    async navigate(url, options = {}) {
        await this.page.goto(url, options);
    }
    async getLocator(selector) {
        await this.page.waitForSelector(selector);
        return this.page.locator(selector);
    }
    async selectOPtion(selector, value) {
        await this.page.waitForSelector(selector);
        await this.page.selectOption(selector, value);
    }
    async scrollTo(selector) {
        await this.page.scrollTo(selector);
    }
    async fill(selector, value){
        await this.page.locator(selector).fill(value)
    }
    async pressKey(key){
        await this.page.keyboard.press(key)
    }
     async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

}
module.exports = BasePage
