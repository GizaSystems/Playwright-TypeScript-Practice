import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class FooterPage {
  readonly page: Page;
    // Locators
  readonly subscription_Title: Locator;
  readonly email_Input: Locator;
  readonly submit_Button: Locator;
  readonly successMessage: Locator;
  readonly arrowBottomRightSide_Button: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subscription_Title = page.locator('#footer h2');
    this.email_Input = page.locator('#susbscribe_email');
    this.submit_Button = page.locator('#subscribe');
    this.successMessage = page.locator('#success-subscribe');
    this.arrowBottomRightSide_Button = page.locator('#scrollUp');
  }

    ///// Actions

  async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async subscribeWithEmail(email: string) {
    await step(`User subscribes to the newsletter with email '${email}'`, async () => {
      await this.email_Input.fill(email);
      await this.submit_Button.click();
    });
  }
  
  async clickArrowScrollToHeader() {
    await step(' Click on arrow at bottom right side to scroll upward', async () => {
      await this.arrowBottomRightSide_Button.click();
    });
  }

    ///// Validations

  async verifySubscriptionText() {
    await step("Verify text 'SUBSCRIPTION' is visible", async () => {
      await expect(this.subscription_Title).toBeVisible();
    });
  }

  async verifySuccessMessage(expectedMessage: string) {
    await step("Verify success message is visible", async () => {
      await expect(this.successMessage).toHaveText(expectedMessage);
    });
  }
}
