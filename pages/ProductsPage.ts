import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class ProductsPage {
    readonly page: Page;

    readonly addToCart_Button: Locator;
    readonly continueShopping_Button: Locator;
    readonly sale_image: Locator;
    readonly productDetails_Button: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addToCart_Button = page.locator('.btn.btn-default.cart');
        this.continueShopping_Button = page.locator('[data-dismiss="modal"]');
        this.sale_image = page.locator('[id="sale_image"]');
        this.productDetails_Button = page.locator('div.product-image-wrapper:has-text("Blue Top") a[href^="/product_details/"]');
    }
    
    ////Actions
    async clickOnAddToCartButton() {
        await step('Add Product to Cart', async () => {
            await this.addToCart_Button.click();
            await this.continueShopping_Button.click();
        })
    }   
    async clickViewProductOfFirstItem() {
        await step('Click on Product Details', async () => {
            await this.productDetails_Button.click();
        })
    } 
    
    //// Validations
    async verifyProductsPageVisible(expectedTitle: string) {
        await step('Verify Products Page is Visible', async () => {
            await expect(this.page).toHaveTitle(expectedTitle);
            await expect(this.sale_image).toBeVisible();
        });
    }
}