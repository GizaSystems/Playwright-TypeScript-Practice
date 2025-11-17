import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  // Locators
  readonly logo_img: Locator;
  readonly viewProduct_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo_img = page.locator('.logo img');
    this.viewProduct_Button = page.getByRole('link', { name: /view product/i });
  }

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }

  async clickViewProduct() {
    await step('Click on View Product', async () => {
      await this.viewProduct_Button.first().click();
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