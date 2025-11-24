import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';
import categoryNavigation from '../resources/test-data/categoryNavigation.json';
export class CategoryPage {
  readonly page: Page;
  readonly categoryHeader: Locator;
  readonly categoryPage_heading: Locator;
  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.categoryHeader = page.locator('div.sidebar h2.category-header');
    this.categoryPage_heading = page.locator('h2.title.text-center');
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
  //Actions
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
  //Validations
  async assertCategoriesVisible() {
    await step("Verify 'Category' section is visible", async () => {
      await expect(this.categoryHeader).toBeVisible();
    });
  }

  async assertCategoryPageText(expectedText: string) {
    await step(`Verify category page shows '${expectedText}'`, async () => {
      const actualText = await this.categoryPage_heading.textContent();
      expect(actualText?.trim().toLowerCase()).toBe(expectedText.toLowerCase());
    });
  }

  async assertWomenCategory() {
    const { mainCategory, subCategory, expectedText } = categoryNavigation.women;
    await step(`Validate ${mainCategory} > ${subCategory}`, async () => {
      await this.expandCategory(mainCategory);
      await this.clickSubCategory(mainCategory, subCategory);
      await this.assertCategoryPageText(expectedText);
    });
  }

  async assertMenCategory() {
    const { mainCategory, subCategory, expectedText } = categoryNavigation.men;
    await step(`Validate ${mainCategory} > ${subCategory}`, async () => {
      await this.expandCategory(mainCategory);
      await this.clickSubCategory(mainCategory, subCategory);
      await this.assertCategoryPageText(expectedText);
    });
  }
}
