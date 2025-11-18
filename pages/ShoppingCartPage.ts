import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class ShoppingCartPage {
  readonly page: Page;
  
  // Locators
  readonly shoppingCart_link: Locator;
  readonly proceedToCheckout_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.shoppingCart_link = page.locator('ol > li.active');
    this.proceedToCheckout_Button = page.locator('a.check_out');
  }

  ///// Actions

  async proceedToCheckout() {
    await step("Proceed To Checkout From Cart", async () => {
      await this.proceedToCheckout_Button.click();
    });
  }

  ///// Validations

  async assertShoppingCartReachedSuccessfully() {
      await step("Shopping Cart is Reached Successfully", async () => {
      await expect(this.shoppingCart_link).toBeVisible;
    });
  }
  
}