import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  readonly url: string = 'https://www.automationexercise.com';

  // Locators
  readonly addItemTOCart_Button: Locator;
  readonly continueShopping_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.addItemTOCart_Button = page.locator('(//*[@data-product-id="1"])[1]');
    this.continueShopping_Button = page.getByText('Continue Shopping');
  }

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto(this.url);
    });
  }

  async addItemToCart() {
    await step("Add Item to Cart", async () => {
      await this.addItemTOCart_Button.click();
      await this.continueShopping_Button.click();
    });
  }

}