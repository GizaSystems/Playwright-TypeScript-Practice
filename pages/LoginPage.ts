import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class LoginPage {
  readonly page: Page;
  readonly url: string = 'https://automationexercise.com/login';

  // Login  
  readonly loginEmail_Input: Locator;
  readonly loginPassword_Input: Locator;
  readonly login_Button: Locator;
  readonly login_Text: Locator;

  // Signup  
  readonly signupName_Input: Locator;
  readonly signupEmail_Input: Locator;
  readonly signup_Button: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login Locators
    this.loginEmail_Input = page.locator('[data-qa="login-email"]');
    this.loginPassword_Input = page.locator('[data-qa="login-password"]');
    this.login_Button = page.locator('[data-qa="login-button"]');
    this.login_Text = page.locator("//h2[normalize-space()='Login to your account']");

    // Signup Locators
    this.signupName_Input = page.locator("//input[@placeholder='Name']");
    this.signupEmail_Input = page.locator("//input[@data-qa='signup-email']");
    this.signup_Button = page.locator("//button[normalize-space()='Signup']");
  }

  ///// Actions

  async navigate() {
    await step(`Navigate to Login Page`, async () => {
      await this.page.goto(this.url);
    });
  }

  async login(username: string, password: string) {
    await step(`User Login with: Username: ${username} and Password: ${password}`, async () => {
      await this.loginEmail_Input.fill(username);
      await this.loginPassword_Input.fill(password);
      await this.login_Button.click();
    });
  }

  async enterNameAndEmailToCreateUser(username: string, email: string) {
    await step('Create User ', async () => {
      await this.signupName_Input.fill(username);
      await this.signupEmail_Input.fill(email);
      await this.signup_Button.click();
    });
  }

  ///// Validations

  async verifyThatUserIsNavigatedToLoginPage(loginUrl: string, loginText: string) {
    await step(`Verify that user is navigated to login page`, async () => {
      await expect(this.page).toHaveURL(loginUrl);
      await expect(this.login_Text).toHaveText(loginText);
    });
  }
}