import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  // Locators
  readonly logo_img: Locator;
  addToCart_Button!: Locator;
  readonly viewCart_Link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo_img = page.locator('.logo img');
    this.viewCart_Link = page.locator('(//a[@href="/view_cart"])[2]');
  }

  /// Methods
  async setAddToCartLocator(productName: string){
    this.addToCart_Button = this.page.locator(`(//p[normalize-space()='${productName}']/following::a[contains(@class,'add-to-cart')])[1]`);
  }

  ///// Actions

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto('');
    });
  }

  async addProductToCart(productName: string){
    await step('Add Product to Cart', async () => {
      this.setAddToCartLocator(productName);
      await this.addToCart_Button.click();
    });
  }

  async clickViewCart(){
    await step('Click View Cart', async () => {
      await this.viewCart_Link.click();
    });
  }

  ///// Validations

  async verifyHomePageVisible(expectedTitle: string) {
    await step("Verify home page is visible successfully", async () => {
      await expect(this.logo_img).toBeVisible();
      await expect(this.page).toHaveTitle(expectedTitle);
    });
  }
}