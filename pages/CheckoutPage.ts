import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class CheckoutPage {
    readonly page: Page;

    readonly deliveryAddress_Text: Locator; 
    readonly productDetails_Link: Locator;
    readonly comment_TextArea: Locator;
    readonly placeOrder_Button: Locator;

    constructor(page: Page) {
        this.page = page;

        this.deliveryAddress_Text = page.locator('id=address_delivery');
        this.productDetails_Link = page.locator('//a[@href="/product_details/1"]');
        this.comment_TextArea = page.locator('[name="message"]');
        this.placeOrder_Button = page.locator('.btn.btn-default.check_out');
    }

    async writeComment(comment: string) {
        await step('Enter Description in Comment Text Area and Click on Place and Confirm Order', async () => {
            await this.comment_TextArea.fill(comment);
        })
    }

    async clickOnPlaceOrderAndConfirm() {
        await step('Click on Place Order and Confirm Button', async () => {
            await this.placeOrder_Button.click();
        })
    }

    async assertOnAddressDetails(addressDetails: string) {
        await step('Assert on Address Details', async () => {
            await expect(this.deliveryAddress_Text).toContainText(addressDetails);
        })

    }

    async assertOnReviewOrder(expectedProductName: string){
        await step('Assert On Review Order', async () => {
            await expect(this.productDetails_Link).toHaveText(expectedProductName);
        })
    }
}   