import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  // Locators
  readonly addItemTOCart_Button: Locator;
  readonly continueShopping_Button: Locator;
  readonly logo_img: Locator;
  readonly fullFledged_txt: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.addItemTOCart_Button = page.locator('div.features_items div.productinfo a[data-product-id="1"]');
    this.continueShopping_Button = page.locator('//button[contains(@class,"btn-block")]');
    this.logo_img = page.locator('.logo img');
    this.fullFledged_txt = page.locator('#slider-carousel h2');
  }

    viewProduct_Button(productName: string): Locator {
    return this.page
      .locator("div.product-image-wrapper", { hasText: productName })
      .locator("a[href^='/product_details/']");
  }

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }

  async clickViewProduct(productName: string) {
    await step(`Click View Product for ${productName}`, async () => {
      await this.viewProduct_Button(productName).click();
    })
  }
  
    ///// Validations

  async verifyHomePageVisible(expectedTitle: string) {
    await step("Verify home page is visible successfully", async () => {
      await expect(this.logo_img).toBeVisible();
      await expect(this.page).toHaveTitle(expectedTitle);
    });
  }

  async verifyFullFledgedTextVisible(expectedText: string) {
    await step('Verify Full-Fledged Text is Visible', async () => {
      await expect(this.fullFledged_txt.first()).toHaveText(expectedText);
    });
  }
}
