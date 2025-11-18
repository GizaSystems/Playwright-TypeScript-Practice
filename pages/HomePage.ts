import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  // Locators
  readonly addItemTOCart_Button: Locator;
  readonly continueShopping_Button: Locator;
  readonly logo_img: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.addItemTOCart_Button = page.locator('div.features_items div.productinfo a[data-product-id="1"]');
    this.continueShopping_Button = page.locator('//button[contains(@class,"btn-block")]');
    this.logo_img = page.locator('.logo img');
  }

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }

  async addItemToCart() {
    await step("Add Item to Cart", async () => {
      await this.addItemTOCart_Button.click();
    });
  }

  async clickOnContinueShoppingButton(){
    await step("click On Continue Shopping Button", async () => {
      await this.continueShopping_Button.click();
    });
  }

  ///// Validations

  async verifyHomePageVisible(expectedTitle: string) {
    await step("Verify home page is visible successfully", async () => {
      await expect(this.logo_img).toBeVisible();
      await expect(this.page).toHaveTitle(expectedTitle);
    });
  }
}