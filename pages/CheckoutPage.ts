import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class CheckoutPage {
    readonly page: Page;

    readonly deliveryAddress_Text: Locator; 
    readonly comment_TextArea: Locator;
    readonly placeOrder_Button: Locator;
    readonly invoiceAddress_Text: Locator;

    constructor(page: Page) {
        this.page = page;

        this.deliveryAddress_Text = page.locator('id=address_delivery');
        this.comment_TextArea = page.locator('[name="message"]');
        this.placeOrder_Button = page.locator('.btn.btn-default.check_out');
        this.invoiceAddress_Text = page.locator('id=address_invoice');
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

    async assetOnInvoiceAddress(invoiceAddress: string) {
        await step('Assert on Invoice Address', async () => {
            await expect(this.invoiceAddress_Text).toContainText(invoiceAddress);
        })
    }
}   
