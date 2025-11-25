import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class ProductsPage {
    readonly page: Page;

    readonly addToCart_Button: Locator;
    readonly continueShopping_Button: Locator;
    readonly allBrands_Text: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addToCart_Button = page.locator('.btn.btn-default.cart');
        this.continueShopping_Button = page.locator('[data-dismiss="modal"]');
        this.allBrands_Text = page.locator('.brands-name');
    }

    brand_text(brandName: string): Locator {
        return this.page.locator(`a[href='/brand_products/${brandName}']`);
  }

    async clickOnAddToCartButton() {
        await step('Add Product to Cart', async () => {
            await this.addToCart_Button.click();
            await this.continueShopping_Button.click();
        })
    }

    async clickOnBrand(brandName: string) {
        await step(`Click View Product for ${brandName}`, async () => {
        await this.brand_text(brandName).click();
        })
    }

    async assertOnBrandsAreVisible() {
        await step('Assert on Brands are Visible on Left Side Bar', async () => {
            await expect(this.allBrands_Text).toBeVisible();
        });
    }
}