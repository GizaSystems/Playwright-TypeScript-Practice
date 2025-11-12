import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;

  readonly featuresItems_Text: Locator;
  readonly viewProduct_Button: Locator;

  constructor(page: Page) {
    this.page = page;

    this.featuresItems_Text = page.locator('//h2[.="Features Items"]');
    this.viewProduct_Button = page.locator('//a[@href="/product_details/1"]');
  }

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }

  async clickViewProduct() {
    await step('Click on View Product', async () => {
      await this.viewProduct_Button.click();
    })
  }

  async assertHomePageLoaded() {
    await step('Assert Home Page is Loaded Successfully', async () => {
      await expect(this.featuresItems_Text).toHaveText('Features Items');
    })
  }

}