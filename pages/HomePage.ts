import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  // Locators
  readonly logo_img: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo_img = page.locator('.logo img');
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
}