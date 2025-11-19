import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class CartPage {
    readonly page: Page;

    readonly proceedToCheckout_Button: Locator;
    readonly shoppingCart_Text: Locator;
    readonly registerLogin_Link: Locator;

    constructor(page: Page) {
        this.page = page;

        this.proceedToCheckout_Button = page.locator('//a[@class="btn btn-default check_out"]');
        this.shoppingCart_Text = page.locator('.breadcrumb li.active');
        this.registerLogin_Link = page.locator("(//a[@href='/login'])[2]");
    }

    async clickOnProceedToCheckout() {
        await step('Click on Proceed To Chechout', async () => {
            await this.proceedToCheckout_Button.click();
        })
    }

    async clickCheckoutRegisterLoginLink() {
        await step('Click Checkout Register / Login Link', async () =>{
            await this.registerLogin_Link.click();
        });
    }

    async assertCartPageLoaded(message: string) {
        await step('Assert Cart Page is Loaded Successfully', async () => {
            await expect(this.shoppingCart_Text).toContainText(message);
        })
    }
}