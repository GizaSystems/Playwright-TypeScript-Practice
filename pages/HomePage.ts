import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  readonly logo_img: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo_img = page.locator('.logo img');
  }

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto(' ');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

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

  //  Validations
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

  async verifyHomePageVisible(expectedTitle: string) {
    await step("Verify home page is visible successfully", async () => {
      await expect(this.logo_img).toBeVisible();
      await expect(this.page).toHaveTitle(expectedTitle);
    });
  }
}
