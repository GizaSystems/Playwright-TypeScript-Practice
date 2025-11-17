import {test, Page, Locator, expect  } from '@playwright/test';
import { step } from 'allure-js-commons';


export class PaymentPage {
    page: Page;

    // Locators
    readonly nameOnCard_Input: Locator;
    readonly cardNumber_Input: Locator;
    readonly cvc_Input: Locator;
    readonly expirationMonth_Input: Locator;
    readonly expirationYear_Input: Locator
    readonly payAndConfirm_Button: Locator;
    readonly orderPlaced_sucessMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.nameOnCard_Input = page.locator("//input[@class='form-control']");
        this.cardNumber_Input = page.locator("//input[@name='card_number']");
        this.cvc_Input = page.locator('//input[@name="cvc"]');
        this.expirationMonth_Input = page.locator('//input[@name="expiry_month"]');
        this.expirationYear_Input = page.locator('//input[@name="expiry_year"]');
        this.payAndConfirm_Button = page.locator('#submit');
        this.orderPlaced_sucessMessage = page.locator("div[id='success_message'] div[class='alert-success alert']");
    }

    // Actions
    async enterPaymentDetails(nameOnCard: string, cvc: string, expirationMonth: string, expirationYear: string){
        await step('Enter Payment Details', async () => {
            await this.nameOnCard_Input.fill(nameOnCard);
            await this.cvc_Input.fill(cvc);
            await this.expirationMonth_Input.fill(expirationMonth);
            await this.expirationYear_Input.fill(expirationYear);
        });
    }

    async clickPayAndConfirm(){
        await step('Click Pay and Confirm', async () => {
            await this.payAndConfirm_Button.click();
        })
    }

    // Validations
    async assertOnOrderPlacedSuccessMessage(expectedMessage: string){
        await step('Assert on Order Placed Success Message', async () => {
            await expect(this.orderPlaced_sucessMessage).toHaveText(expectedMessage);
        })
    }

    

} 