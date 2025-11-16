import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  // readonly url: string = 'https://www.automationexercise.com';

  constructor(page: Page) {
    this.page = page;
  }
  
  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto(' ');
      await this.page.waitForLoadState('domcontentloaded');
    });
  } 

   //actions
  async expandCategory(name: string) {
    await step(`Expand '${name}' category`, async () => {
      const toggle = this.page.locator(`a[href="#${name}"]`);
      await toggle.scrollIntoViewIfNeeded();
      await toggle.click();
      await this.page.locator(`#${name}.panel-collapse`).waitFor({ state: 'visible' });
    });
  }
  async clickSubCategory(main: string, sub: string) {
    await step(`Click '${sub}' under '${main}' category`, async () => {
      const subLink = this.page.locator(`#${main} .panel-body ul li a`, { hasText: sub });
      await subLink.scrollIntoViewIfNeeded();
      await subLink.click();
    });
  }
  //validations
async assertCategoriesVisible() {
  await step("Verify 'Category' section is visible", async () => {
    const categoryHeader = this.page.locator('div.left-sidebar >> text=Category');
    await expect(categoryHeader).toBeVisible();
  });
}
  async assertCategoryPageText(expectedText: string) {
    await step(`Verify category page shows '${expectedText}'`, async () => {
      const heading = this.page.locator('h2.title.text-center');
      const actualText = await heading.textContent();
      expect(actualText?.trim().toLowerCase()).toBe(expectedText.toLowerCase());
    });
  }
}