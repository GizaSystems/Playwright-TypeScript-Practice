import { test, type Page, type Locator, expect } from "@playwright/test";
import { step } from "allure-js-commons";

export class HomePage {
  readonly page: Page;

  // readonly url: string = 'https://www.automationexercise.com';
  readonly categoryHeader: Locator;

  // Locators
  readonly logo_img: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryHeader = page.locator("div.left-sidebar >> text=Category");
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

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto(" ");
      await this.page.waitForLoadState("domcontentloaded");
    });
  }

  async expandCategory(name: string) {
    await step(`Expand '${name}' category`, async () => {
      const toggle = this.toggleCategory(name);
      await toggle.scrollIntoViewIfNeeded();
      await toggle.click();
      await this.categoryPanel(name).waitFor({ state: "visible" });
    });
  }

  ///// Validations

  async clickSubCategory(main: string, sub: string) {
    await step(`Click '${sub}' under '${main}' category`, async () => {
      const subLink = this.subCategory(main, sub);
      await subLink.scrollIntoViewIfNeeded();
      await subLink.click();
    });
  }
  //validations
  async assertCategoriesVisible() {
    await step("Verify 'Category' section is visible", async () => {
      await expect(this.categoryHeader).toBeVisible();
    });
  }

  async assertCategoryPageText(expectedText: string) {
    await step(`Verify category page shows '${expectedText}'`, async () => {
      const heading = this.page.locator("h2.title.text-center");
      const actualText = await heading.textContent();
      expect(actualText?.trim().toLowerCase()).toBe(expectedText.toLowerCase());
    });
  }
}
