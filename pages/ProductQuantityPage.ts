import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class ProductQuantityPage {
    readonly page: Page;

    readonly viewProductBtn_button: Locator;
    readonly hoverBtn_button: Locator;
    readonly addToCartBtn_button: Locator;
    readonly viewCartBtn_button: Locator;
    readonly productQuantityBtn_button: Locator;
    readonly errorMessage_label: Locator;
    constructor(page: Page) {
        this.page = page;

        this.viewProductBtn_button = page.locator('//a[@href="/product_details/1"]');
        this.hoverBtn_button = page.locator('id=quantity');
        this.addToCartBtn_button = page.locator("//button[@class='btn btn-default cart']");
        this.viewCartBtn_button = page.locator("//p[@class='text-center']/a[@href='/view_cart']/u");
        this.productQuantityBtn_button = page.locator("//td[@class ='cart_quantity']/button[@class='disabled']");
        this.errorMessage_label = page.locator('//p[@class="text-center"][1]');
        
    }
    async addProductQuantity(quantity: number) {
        await step('Increase Product Quantity', async () => {
            await this.hoverBtn_button.hover();
            await this.hoverBtn_button.click();
            await this.hoverBtn_button.fill(quantity.toString());
            
        })
    }
    async clickOnAddToCartButton() {
        await step('Click on Add To Cart Button', async () => {
            await this.addToCartBtn_button.click();
        })
    }
    async clickOnViewCartButton() {
        await step('Click on View Cart Button', async () => {
            await this.viewCartBtn_button.click();
        })
    }
    /////////////validations////////////
    async verifyProductDetailsIsOpened(title: string) {
        await step('Verify Product Details is Opened', async () => {
            await expect(this.page).toHaveTitle(title);
        })
    }
    async verifyProductAddedWithSelectedQuantity(quantity: number) {
        await step('Verify Product Added With Selected Quantity', async () => {
            await expect(this.productQuantityBtn_button).toContainText(quantity.toString());
        })
    }
    async verifyErrorMessageWithZeroQuantity(expectedText: string) {
    await expect(this.errorMessage_label).toHaveText(expectedText);
  }
}