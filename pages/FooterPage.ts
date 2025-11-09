import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class FooterPage {
  readonly page: Page;
    // Locators
  readonly subscriptionTitle: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subscriptionTitle = page.locator('#footer h2');
    this.emailInput = page.locator('#susbscribe_email');
    this.submitButton = page.locator('#subscribe');
    this.successMessage = page.locator('#success-subscribe');
  }

    ///// Actions

  async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async subscribeWithEmail(email: string) {
    await step(`User subscribes to the newsletter with email '${email}'`, async () => {
      await this.emailInput.fill(email);
      await this.submitButton.click();
    });
  }

    ///// Validations

  async verifySubscriptionText() {
    await step("Verify text 'SUBSCRIPTION' is visible", async () => {
      await expect(this.subscriptionTitle).toBeVisible();
    });
  }

  async verifySuccessMessage() {
    await step("Verify success message is visible", async () => {
    await expect(this.successMessage).toHaveText('You have been successfully subscribed!');
    });
  }
}
