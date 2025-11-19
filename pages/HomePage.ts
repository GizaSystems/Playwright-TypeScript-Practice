import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  // Locators
  readonly logo_img: Locator;
  readonly fullFledged_txt: Locator;
  addToCart_Button!: Locator;
  readonly viewCart_Link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo_img = page.locator('.logo img');
    this.fullFledged_txt = page.locator('#slider-carousel h2');
     this.viewCart_Link = page.locator('(//a[@href="/view_cart"])[2]');
  }

    viewProduct_Button(productName: string): Locator {
    return this.page
      .locator("div.product-image-wrapper", { hasText: productName })
      .locator("a[href^='/product_details/']");
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

  async clickViewProduct(productName: string) {
    await step(`Click View Product for ${productName}`, async () => {
      await this.viewProduct_Button(productName).click();
    })
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

  async verifyFullFledgedTextVisible(expectedText: string) {
    await step('Verify Full-Fledged Text is Visible', async () => {
      await expect(this.fullFledged_txt.first()).toHaveText(expectedText);
    });
  }
}
