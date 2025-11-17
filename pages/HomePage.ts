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

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
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