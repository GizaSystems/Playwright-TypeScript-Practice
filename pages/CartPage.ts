import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class CartPage {
    readonly page: Page;

    // Locators
    readonly shoppingCart_Link: Locator;
    readonly proceedToCheckout_Button: Locator;
    readonly registerLogin_Link: Locator;

    constructor(page: Page){
        this.page = page;
        this.shoppingCart_Link = page.locator("//li[@class='active']");
        this.proceedToCheckout_Button = page.locator('//a[@class="btn btn-default check_out"]');
        this.registerLogin_Link = page.locator("(//a[@href='/login'])[2]");
    }
    
    // Actions
    async clickProceedToCheckout(){
        await step('Click Proceed To Checkout', async () => {
            await this.proceedToCheckout_Button.click();
        });
    }

    async clickRegisterLoginLink() {
        await step('Click Register / Login Link', async () =>{
            await this.registerLogin_Link.click();
        });
    }

    // Validations
    async verifyCartPageIsVisible() {
        await step('Verify Cart Page is Visible', async () => {
            await expect(this.shoppingCart_Link).toBeVisible();
        });
    }
    
}