import { type Page, type Locator, expect } from '@playwright/test';
export class BrandPage {
    readonly page: Page;

    readonly brandProducts: Locator;
    constructor(page: Page) {
    this.page = page;

    this.brandProducts =  page.locator('.features_items');    
  }

  async assertOnNavigationToBrandPage(expectedBrand: string) {
    await expect(this.page).toHaveURL(expectedBrand);
  }

  async assertOnBrandProductsDisplayed(){
    await expect(this.brandProducts).toBeVisible();
  }
}