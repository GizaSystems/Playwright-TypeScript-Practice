import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  readonly url: string = 'https://www.automationexercise.com';

  constructor(page: Page) {
    this.page = page;
    //  Locators
  }

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto(this.url);
    });
  }

  async verifyHomePageLoaded() {
    await step("Verify that home page is visible successfully", async () => {
   await expect(this.page).toHaveURL('https://www.automationexercise.com');
   await expect(this.page.locator('body')).toBeVisible();
 });
}

}