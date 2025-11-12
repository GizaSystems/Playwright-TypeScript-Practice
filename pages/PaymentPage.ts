import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class PaymentPage {
    readonly page: Page;

    readonly nameOnCard_Input: Locator; 
    readonly cardNumber_Input: Locator; 
    readonly cvc_Input: Locator;
    readonly expirationMonth_Input: Locator;  
    readonly expirationYear_Input: Locator; 
    readonly payAndConfirmOrder_Button: Locator;
    readonly sucessPaymentAlert: Locator;

    constructor(page: Page) {
        this.page = page;

        this.nameOnCard_Input = page.locator('//input[@name="name_on_card"]');
        this.cardNumber_Input = page.locator('.form-control.card-number');
        this.cvc_Input = page.locator('.form-control.card-cvc');
        this.expirationMonth_Input = page.locator('.form-control.card-expiry-month');
        this.expirationYear_Input = page.locator('.form-control.card-expiry-year');
        this.payAndConfirmOrder_Button = page.locator('id=submit');
        this.sucessPaymentAlert = page.locator('//b[.="Order Placed!"]');   
    }

    async pay(nameOnCard: string, cardNumber: string, cvc: string, expirationMonth: string, expirationYear: string) {
        await step('Fill Payment Details and Confirm Order', async () => {
            await this.nameOnCard_Input.fill(nameOnCard);
            await this.cardNumber_Input.fill(cardNumber);
            await this.cvc_Input.fill(cvc);
            await this.expirationMonth_Input.fill(expirationMonth);
            await this.expirationYear_Input.fill(expirationYear);
            await this.payAndConfirmOrder_Button.click();

        })
    }

    async assertSuccessPaymentMessage(message: string) {
        await step('Assert on Success Payment Message', async () => {
            await expect(this.sucessPaymentAlert).toContainText(message);
        })
    }
}