import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class ProductDetailsPage{

    readonly page: Page;
    readonly productName : Locator;
    readonly productCategory : Locator;
    readonly productPrice : Locator;
    readonly productAvailability : Locator;
    readonly productCondition : Locator;
    readonly productBrand : Locator;         

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.product-information h2');
        this.productCategory = page.locator('.product-information h2 + p');
        this.productPrice = page.locator('.product-information span span');
        this.productAvailability = page.locator('.product-information span + p');
        this.productCondition = page.locator('.product-information span + p + p');
        this.productBrand = page.locator('.product-information span + p + p + p');
    }

    ///// Validations
    async verifyProductDetailsAreVisible(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
    }        

}