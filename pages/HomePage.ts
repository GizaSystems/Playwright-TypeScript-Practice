import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;

  // Locators
  readonly logo_img: Locator;
  readonly homePageCenterHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo_img = page.locator('.logo img');
    this.homePageCenterHeader = page.locator(".features_items h2.title.text-center");
  }

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }
  
  ///// Validations

  async verifyHomePageVisible(expectedTitle: string , homePageCenterHeader: string) {
    await step("Verify home page is visible successfully", async () => {
      await expect(this.logo_img).toBeVisible();
      await expect(this.page).toHaveTitle(expectedTitle);
      await expect(this.homePageCenterHeader).toHaveText(homePageCenterHeader);
    });
  }
}