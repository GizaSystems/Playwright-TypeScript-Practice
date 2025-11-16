import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class ProductsPage {
  readonly page: Page;

  // Locators for product elements and cart modal
  readonly firstProduct: Locator;
  readonly secondProduct: Locator;
  readonly firstProductAddToCartButton: Locator;
  readonly secondProductAddToCartButton: Locator;
  readonly modal: Locator; // Cart modal that appears after adding product to cart
  readonly continueShoppingButton: Locator; // Button in modal to continue shopping
  readonly viewCartButtonInModal: Locator; // View Cart link within the modal

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.firstProduct = page.locator('.productinfo').first(); // First product card on the products page
    this.secondProduct = page.locator('.productinfo').nth(1); // Second product card on the products page
    this.firstProductAddToCartButton = page.locator('.productinfo').first().locator('a[data-product-id]'); // Add to cart button for first product (visible on hover)
    this.secondProductAddToCartButton = page.locator('.productinfo').nth(1).locator('a[data-product-id]'); // Add to cart button for second product (visible on hover)
    this.modal = page.locator('.modal-content').or(page.locator('modal-content')); // Cart confirmation modal with multiple fallback selectors
    this.continueShoppingButton = page.locator('.modal-footer button').first(); // Continue Shopping button in modal footer
    this.viewCartButtonInModal = this.modal.locator('a[href*="view_cart"]').first(); // View Cart link within the modal
  }

  async navigate() {
    await step(`Navigate to Products Page`, async () => {
      await this.page.goto('/products');
    });
  }

  ///// Actions

  async hoverOverFirstProduct() {
    // Hover action is required to make the "Add to cart" button visible
    await step("Hover over first product", async () => {
      await this.firstProduct.hover();
    });
  }

  async hoverOverSecondProduct() {
    // Hover action is required to make the "Add to cart" button visible
    await step("Hover over second product", async () => {
      await this.secondProduct.hover();
    });
  }

  async clickAddToCartForFirstProduct() {
    // Adds first product to cart and waits for confirmation modal to appear
    await step("Click 'Add to cart' for first product", async () => {
      await this.firstProductAddToCartButton.click();
      await this.modal.waitFor({ state: 'visible' });
    });
  }

  async clickAddToCartForSecondProduct() {
    // Adds second product to cart and waits for confirmation modal to appear
    await step("Click 'Add to cart' for second product", async () => {
      await this.secondProductAddToCartButton.click();
      await this.modal.waitFor({ state: 'visible' });
    });
  }

  async clickContinueShoppingButton() {
    // Closes the modal and continues browsing products
    await step("Click 'Continue Shopping' button", async () => {
      await this.continueShoppingButton.waitFor({ state: 'visible' });
      await this.continueShoppingButton.click();
      await this.modal.waitFor({ state: 'hidden' });
    });
  }

  async clickViewCartButton() {
    // Navigates to cart page from the modal after adding product
    await step("Click 'View Cart' button", async () => {
      await this.modal.waitFor({ state: 'visible', timeout: 10000 });
      await this.viewCartButtonInModal.waitFor({ state: 'visible', timeout: 10000 });
      await this.viewCartButtonInModal.click();
    });
  }

}
