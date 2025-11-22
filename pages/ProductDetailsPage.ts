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
        this.productName = page.locator('//div[@class="product-information"]/h2');
        this.productCategory = page.locator('//div[@class="product-information"]//p[starts-with(text(),"Category:")]');
        this.productPrice = page.locator('//div[@class="product-information"]//span/span[starts-with(text(),"Rs.")]'); 
        this.productAvailability = page.locator('//b[normalize-space()="Availability:"]');
        this.productCondition = page.locator('//div[@class="product-information"]//p[b[starts-with(text(),"Condition:")]]');
        this.productBrand = page.locator('//div[@class="product-information"]//p[b[starts-with(text(),"Brand:")]]');
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