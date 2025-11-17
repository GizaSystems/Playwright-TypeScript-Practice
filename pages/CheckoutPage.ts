import {  Page,  Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';



export class CheckoutPage {
    readonly page: Page;

    // Locators
    readonly deliveryAddress_ListItem: Locator;
    readonly productDetails_Link: Locator;
    readonly comment_textarea: Locator;
    readonly placeOrder_Button: Locator;

    constructor(page: Page){
        this.page = page;
        this.deliveryAddress_ListItem = page.locator("ul[id='address_delivery'] li:nth-child(4)");
        this.productDetails_Link = page.locator('//a[@href="/product_details/1"]');
        this.comment_textarea = page.locator("//textarea[@name='message']");
        this.placeOrder_Button = page.locator('//a[@class="btn btn-default check_out"]');
    }

    // Actions
    async addComment(comment: string){
        await step('Add Comment', async () => {
            await this.comment_textarea.fill(comment);
        });
    }

    async placeOrder() {
        await step('Place Order', async () => {
            await this.placeOrder_Button.click();
        });
    }

    // Validations
    async assertOnDeliveryAddress(expectedAddress: string) {
        await step('Assert on Delivery Address', async () => {
            await expect(this.deliveryAddress_ListItem).toHaveText(expectedAddress);
        });
    }

    async assertOnReviewOrder(expectedProductName: string){
        await step('Assert On Review Order', async () => {
            await expect(this.productDetails_Link).toHaveText(expectedProductName);
        })
    }
    


    
}