import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class ProductQuantityPage {
    readonly page: Page;

    readonly viewProductBtn_button: Locator;
    readonly productDetails_label: Locator;
    readonly hoverBtn_button: Locator;
    readonly addToCartBtn_button: Locator;
    readonly viewCartBtn_button: Locator;
    readonly productQuantityBtn_button: Locator;
    constructor(page: Page) {
        this.page = page;

        this.viewProductBtn_button = page.locator("(//div[@class='choose']//a)[2]");
        this.productDetails_label = page.locator("//span/Label");
        this.hoverBtn_button = page.locator('id=quantity');
        this.addToCartBtn_button = page.locator("//button[@class='btn btn-default cart']");
        this.viewCartBtn_button = page.locator("//p[@class='text-center']/a[@href='/view_cart']/u");
        this.productQuantityBtn_button = page.locator("//td[@class ='cart_quantity']/button[@class='disabled']");
        
    }
    async clickOnViewProductButton() {
        await step('Click on View Product Button', async () => {
            await this.viewProductBtn_button.click();
        })
    }
    async increaseProductQuantity(quantity: number) {
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
    async verifyProductDetailsIsOpened(label: string) {
        await step('Verify Product Details is Opened', async () => {
            await expect(this.page).toHaveTitle(label);
        })
    }
    async verifyProductAddedWithSelectedQuantity(quantity: number) {
        await step('Verify Product Added With Selected Quantity', async () => {
            await expect(this.productQuantityBtn_button).toHaveText(quantity.toString());
        })
    }
}