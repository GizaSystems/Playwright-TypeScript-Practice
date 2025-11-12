import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class CartPage {
    readonly page: Page;

    readonly proceedToCheckout_Button: Locator;
    readonly shoppingCart_Text: Locator;


    constructor(page: Page) {
        this.page = page;

        this.proceedToCheckout_Button = page.locator('//a[@class="btn btn-default check_out"]')
        this.shoppingCart_Text = page.locator('//li[@class="active"]');
    }

    async clickOnProceedToCheckout() {
        await step('Click on Proceed To Chechout', async () => {
            await this.proceedToCheckout_Button.click();
        })
    }

    async assertCartPageLoaded() {
        await step('Assert Cart Page is Loaded Successfully', async () => {
            await expect(this.shoppingCart_Text).toContainText('Shopping Cart');
        })
    }
}