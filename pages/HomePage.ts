import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;

  readonly featuresItems: Locator;
  readonly viewProduct_Button: Locator;

  constructor(page: Page) {
    this.page = page;

    this.featuresItems = page.locator('.features_items .title.text-center');
    this.viewProduct_Button = page.getByRole('link', { name: /view product/i });
  }

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

  async assertHomePageLoaded() {
    await step('Assert Home Page is Loaded Successfully', async () => {
      await expect(this.featuresItems).toBeVisible();
    })
  }

}