import { test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  readonly homePage_icon: Locator;
  // readonly url: string = 'https://www.automationexercise.com';

  constructor(page: Page) {
    this.page = page;

    //locators 
    this.homePage_icon = page.locator("//a[normalize-space()='Home']");

  }

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }

  ///// Validations

  async verifyHomePageLoaded(homePageTitle: string, highlightedColorAttribute: string, highlightedColorValue: string) {
    await step("Verify that home page is visible successfully", async () => {
      await expect(this.page).toHaveTitle(homePageTitle);
      await expect(this.homePage_icon).toHaveAttribute(highlightedColorAttribute, highlightedColorValue);
    });
  }
}