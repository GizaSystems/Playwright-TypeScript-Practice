import { test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  readonly homePageCenterHeader: Locator;
  // readonly url: string = 'https://www.automationexercise.com';

  constructor(page: Page) {
    this.page = page;
    this.homePageCenterHeader = page.locator(".features_items h2.title.text-center");
  }

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }

  ///// Validations

  async verifyUserNavigatedToHomePage(homePageTitle: string, homePageCenterHeader: string) {
    await step("Verify User Navigated To HomePage", async () => {
      await expect(this.page).toHaveTitle(homePageTitle);
      await expect(this.homePageCenterHeader).toHaveText(homePageCenterHeader);
    });
  }
}