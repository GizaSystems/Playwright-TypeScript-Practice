import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  // Locators
  readonly logo_img: Locator;
  readonly fullFledged_txt: Locator;
  readonly recommendedItem_txt: Locator;
  readonly recommendedAddToCartButton: Locator;
  readonly ViewCart_btn : Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo_img = page.locator('.logo img');
    this.fullFledged_txt = page.locator('#slider-carousel h2');
    this.recommendedItem_txt = page.locator("//div[@class='recommended_items']//h2");
    this.recommendedAddToCartButton = page.locator("//div[contains(@class,'item active')]//div[contains(@class,'product-image-wrapper') and contains(.,'Winter Top')]//a[contains(@class,'add-to-cart')]");
    this.ViewCart_btn = page.locator("//div[@id='cartModal']//u[text()='View Cart']");
  }

    viewProduct_Button(productName: string): Locator {
    return this.page
      .locator("div.product-image-wrapper", { hasText: productName })
      .locator("a[href^='/product_details/']");
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

  async addRecommendItemToCart() {
   await step(`Click Add Product for Recommended Item`, async () => {
      await this.recommendedAddToCartButton.click();
    })
  }

  async clickViewCart(){
    await step(`Click View Cart button`, async () => {
      await this.ViewCart_btn.click();
    })
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
  async verifyRecommendedItemTextVisible() {
     await step("Verify Recommended items is visible successfully", async () => {
      await expect(this.recommendedItem_txt.first()).toBeVisible();
    });
  }
}
