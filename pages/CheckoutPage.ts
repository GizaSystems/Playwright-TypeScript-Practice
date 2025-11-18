import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class CheckoutPage {
  readonly page: Page;
  
  // Locators
  readonly address1_link: Locator;
  readonly orderComment_Input: Locator;
  readonly placeOrder_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.address1_link = page.locator('(//li[contains(@class, "address_address1")])[2]');
    this.orderComment_Input = page.locator('[name="message"]');
    this.placeOrder_Button = page.locator('[href="/payment"]');
  }

  ///// Actions

  async addCommentAboutOrder(comment: string) {
    await step("Add Comment About An Order", async () => {
      await this.orderComment_Input.fill(comment);
    });
  }

  async placeOrder() {
    await step("Place The Order", async () => {
      await this.placeOrder_Button.click();
    });
  }

  ///// Validations

  async assertCheckoutAddress(address1: string) {
      await step("Verify Checkout Address is correct", async () => {
      await expect(this.address1_link).toHaveText(address1);
    });
  }
  
}