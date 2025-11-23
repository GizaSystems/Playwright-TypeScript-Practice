import { test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;

  // readonly url: string = 'https://www.automationexercise.com';
  readonly categoryHeader: Locator;

  // Locators
  readonly logo_img: Locator;
  readonly fullFledged_txt: Locator;
  readonly categoryPageHeading: Locator;
  constructor(page: Page) {
    this.page = page;
    this.logo_img = page.locator('.logo img');
    this.categoryHeader = page.getByRole('heading', { name: /category/i });
    this.fullFledged_txt = page.locator('#slider-carousel h2');
    this.categoryPageHeading = page.locator('h2.title.text-center');
  }
  //locator helper
  toggleCategory(name: string) {
    return this.page.locator(`a[href="#${name}"]`);
  }

  subCategory(main: string, sub: string) {
    return this.page.locator(`#${main} .panel-body ul li a`, { hasText: sub });
  }

  categoryPanel(name: string) {
    return this.page.locator(`#${name}.panel-collapse`);
  }

  viewProduct_Button(productName: string): Locator {
    return this.page
      .locator('div.product-image-wrapper', { hasText: productName })
      .locator("a[href^='/product_details/']");
  }

  ///// Actions

  async navigate() {
    await step('Navigate to Home Page', async () => {
      await this.page.goto('');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async expandCategory(name: string) {
    await step(`Expand '${name}' category`, async () => {
      const toggle = this.toggleCategory(name);
      await toggle.scrollIntoViewIfNeeded();
      await toggle.click();
      await this.categoryPanel(name).waitFor({ state: 'visible' });
    });
  }
  async clickSubCategory(main: string, sub: string) {
    await step(`Click '${sub}' under '${main}' category`, async () => {
      const subLink = this.subCategory(main, sub);
      await subLink.scrollIntoViewIfNeeded();
      await subLink.click();
    });
  }

  async clickViewProduct(productName: string) {
    await step(`Click View Product for ${productName}`, async () => {
      await this.viewProduct_Button(productName).click();
    });
  }
  
  ///// Validations

  async verifyHomePageVisible(expectedTitle: string) {
    await step('Verify home page is visible successfully', async () => {
      await expect(this.logo_img).toBeVisible();
      await expect(this.page).toHaveTitle(expectedTitle);
    });
  }

  async assertCategoriesVisible() {
    await step("Verify 'Category' section is visible", async () => {
      await expect(this.categoryHeader).toBeVisible();
    });
  }

  async assertCategoryPageText(expectedText: string) {
    await step(`Verify category page shows '${expectedText}'`, async () => {
      const actualText = await this.categoryPageHeading.textContent();
      expect(actualText?.trim().toLowerCase()).toBe(expectedText.toLowerCase());
    });
  }

  async verifyFullFledgedTextVisible(expectedText: string) {
    await step('Verify Full-Fledged Text is Visible', async () => {
      await expect(this.fullFledged_txt.first()).toHaveText(expectedText);
    });
  }
}
