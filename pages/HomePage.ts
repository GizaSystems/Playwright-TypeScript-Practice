import {test, type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HomePage {
  readonly page: Page;
  readonly url: string = 'https://www.automationexercise.com';
  readonly subscriptionTitle: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

//*[@id="footer"]//h2

  constructor(page: Page) {
    this.page = page;
    this.subscriptionTitle = page.locator('h2:has-text("Subscription")');
    this.emailInput = page.locator('#susbscribe_email');
    this.submitButton = page.locator('#subscribe');
    this.successMessage = page.locator('#success-subscribe');
  }

  async navigate() {
    await step("Navigate to Home Page", async () => {
      await this.page.goto(this.url);
    });
  }

    async verifyHomePageVisible() {
    await step("Verify home page is visible successfully", async () => {
      await expect(this.page.locator('body')).toBeVisible();
      await expect(this.page).toHaveTitle(/Automation Exercise/i);
    });
  }

    async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

    async verifySubscriptionText() {
    await step("Verify text 'SUBSCRIPTION' is visible", async () => {
      await expect(this.subscriptionTitle).toBeVisible();
    });
  }

    async subscribeWithEmail(email: string) {
    await step(`Enter email address '${email}' and click arrow button`, async () => {
      await this.emailInput.fill(email);
      await this.submitButton.click();
    });
  }

    async verifySuccessMessage() {
    await step("Verify success message 'You have been successfully subscribed!' is visible", async () => {
      await expect(this.successMessage).toBeVisible();
    });
  }

}