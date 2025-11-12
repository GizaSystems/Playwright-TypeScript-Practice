import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class ProductsPage {
    readonly page: Page;

    readonly addToCart_Button: Locator;
    readonly continueShopping_Button: Locator;


    constructor(page: Page) {
        this.page = page;

        this.addToCart_Button = page.locator('.btn.btn-default.cart')
        this.continueShopping_Button = page.locator('.btn.btn-success.close-modal.btn-block')
    }

    async clickOnAddToCartButton() {
        await step('Add Product to Cart', async () => {
            await this.addToCart_Button.click();
            await this.continueShopping_Button.click();
        })
    }
}