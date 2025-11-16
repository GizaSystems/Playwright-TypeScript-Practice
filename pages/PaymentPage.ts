import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class PaymentPage {
  readonly page: Page;
  
  // Locators
  readonly nameonCard_Input: Locator;
  readonly cardNumber_Input: Locator;
  readonly CVC_Input: Locator;
  readonly expirationMonth_Input: Locator;
  readonly expirationYear_Input: Locator;
  readonly payandConfirmOrder_Button: Locator;
  readonly successMessage_link: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.nameonCard_Input = page.locator('[name="name_on_card"]');
    this.cardNumber_Input = page.locator('[name="card_number"]');
    this.CVC_Input = page.locator('[name="cvc"]');
    this.expirationMonth_Input = page.locator('[name="expiry_month"]');
    this.expirationYear_Input = page.locator('[name="expiry_year"]');
    this.payandConfirmOrder_Button = page.locator('[id="submit"]');
    this.successMessage_link = page.locator('//*[@data-qa="order-placed"]/b');

  }

  ///// Actions

  async addPaymentDetails(nameoncard: string, cardnumber: string, CVC: string, expirationmonth: string, expirationyear: string) {
    await step("Add Payment Details", async () => {
      await this.nameonCard_Input.fill(nameoncard);
      await this.cardNumber_Input.fill(cardnumber);
      await this.CVC_Input.fill(CVC);
      await this.expirationMonth_Input.fill(expirationmonth);
      await this.expirationYear_Input.fill(expirationyear);
    });
  }

  async clickPayandConfirmOrder() {
    await step("Click on Pay and Confirm Order Button", async () => {
        await this.payandConfirmOrder_Button.click();
    });
  }

  ///// Validations

  async assertOrderPlacedSuccessfully(massage: string) {
      await step("Verify order has been placed successfully", async () => {
      await expect(this.successMessage_link).toContainText(massage);
    });
  }
  
}