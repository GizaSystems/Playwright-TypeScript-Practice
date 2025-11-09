import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  readonly homePage_url: string = 'https://automationexercise.com/';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }

}