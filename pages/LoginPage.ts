import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class LoginPage {
  readonly page: Page;
  readonly url: string = 'https://www.automationexercise.com/login';

  readonly loginEmail_Input: Locator;
  readonly loginPassword_Input: Locator;
  readonly login_Button: Locator;
  readonly login_Text: Locator;
  readonly signupName_field: Locator;
  readonly signupEmail_field: Locator;
  readonly signup_button: Locator;
  readonly mr_checkbox: Locator;
  readonly password_field: Locator;
  readonly firstName_field: Locator;
  readonly lastName_field: Locator;
  readonly address_field: Locator;
  readonly state_field: Locator;
  readonly city_field: Locator;
  readonly zipcode_field: Locator;
  readonly mobileNumber_field: Locator;
  readonly createAccount_button: Locator;


  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.loginEmail_Input = page.locator('[data-qa="login-email"]');
    this.loginPassword_Input = page.locator('[data-qa="login-password"]');
    this.login_Button = page.locator('[data-qa="login-button"]');
    this.login_Text = page.locator("//h2[normalize-space()='Login to your account']");
    this.signupName_field = page.locator("//input[@placeholder='Name']");
    this.signupEmail_field = page.locator("//input[@data-qa='signup-email']");
    this.signup_button = page.locator("//button[normalize-space()='Signup']");
    this.mr_checkbox = page.locator("//input[@id='id_gender1']");
    this.password_field = page.locator("//input[@id='password']");
    this.firstName_field = page.locator("//input[@id='first_name']");
    this.lastName_field = page.locator("//input[@id='last_name']");
    this.address_field = page.locator("//input[@id='address1']");
    this.state_field = page.locator("//input[@id='state']");
    this.city_field = page.locator("//input[@id='city']");
    this.zipcode_field = page.locator("//input[@id='zipcode']");
    this.mobileNumber_field = page.locator("//input[@id='mobile_number']");
    this.createAccount_button = page.locator("//button[normalize-space()='Create Account']");
  }

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

  async verifyLoginPageLoaded() {
    await step("Verify 'Login to your account' is visible", async () => {
      await expect(this.login_Text).toHaveText('Login to your account');
    });
  }

  async VerifyThatUserIsNavigatedToLoginPage() {
    await step(`Verify that user is navigated to login page`, async () => {
      await expect(this.page).toHaveURL(this.url);
      await expect(this.login_Text).toBeVisible();
    });
  }

  async enterNameAndEmailToCreateUser(username: string, email: string,
  ) {
    await step('create User From UI', async () => {
      await this.signupName_field.fill(username);
      await this.signupEmail_field.fill(email);
      await this.signup_button.click();
    })
  }
}