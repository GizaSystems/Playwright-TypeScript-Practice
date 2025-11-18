import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class CartPage {
  readonly page: Page;

  // Locators for cart table elements
  readonly productRows: Locator; // All product rows in the cart table
  readonly productPrice: Locator; // Product price element
  readonly productQuantity: Locator; // Product quantity element
  readonly productTotal: Locator; // Product total price element

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.productRows = page.locator('#cart_info_table tbody tr'); // All rows in the cart table (each row represents one product)
    this.productPrice = page.locator('.cart_price p'); // Price column in cart table
    this.productQuantity = page.locator('.cart_quantity button'); // Quantity column in cart table
    this.productTotal = page.locator('.cart_total p'); // Total price column in cart table
  }

  async navigate() {
    await step(`Navigate to Cart Page`, async () => {
      await this.page.goto('/view_cart');
    });
  }

  ///// Validations

  async assertProductsAddedToCart(expectedCount: number) {
    // Verifies that the expected number of products are present in the cart
    await step(`Verify ${expectedCount} products are added to Cart`, async () => {
      await expect(this.productRows).toHaveCount(expectedCount);
    });
  }

  async assertCartDetailsAreCorrect() {
    // Verifies that each product in cart has visible price, quantity, and total price
    await step("Verify prices, quantity and total price for all products", async () => {
      const rows = await this.productRows.count();
      expect(rows).toBeGreaterThan(0);
      
      // Iterate through each product row and verify all details are visible
      for (let i = 0; i < rows; i++) {
        const row = this.productRows.nth(i);
        const price = row.locator('.cart_price p');
        const quantity = row.locator('.cart_quantity button');
        const total = row.locator('.cart_total p');
        
        await expect(price).toBeVisible();
        await expect(quantity).toBeVisible();
        await expect(total).toBeVisible();
      }
    });
  }

}
