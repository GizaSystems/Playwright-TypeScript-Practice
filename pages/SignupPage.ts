import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class SignupPage {
  readonly page: Page;

  // Inputs and Controls
  readonly mr_Checkbox: Locator;
  readonly password_Input: Locator;
  readonly firstName_Input: Locator;
  readonly lastName_Input: Locator;
  readonly address_Input: Locator;
  readonly state_Input: Locator;
  readonly city_Input: Locator;
  readonly zipcode_Input: Locator;
  readonly mobileNumber_Input: Locator;
  creation_Text: Locator;

  // Buttons
  readonly createAccount_Button: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.mr_Checkbox = page.locator("//input[@id='id_gender1']");
    this.password_Input = page.locator("//input[@id='password']");
    this.firstName_Input = page.locator("//input[@id='first_name']");
    this.lastName_Input = page.locator("//input[@id='last_name']");
    this.address_Input = page.locator("//input[@id='address1']");
    this.state_Input = page.locator("//input[@id='state']");
    this.city_Input = page.locator("//input[@id='city']");
    this.zipcode_Input = page.locator("//input[@id='zipcode']");
    this.mobileNumber_Input = page.locator("//input[@id='mobile_number']");
    this.createAccount_Button = page.locator("//button[normalize-space()='Create Account']");
    this.creation_Text = page.locator("//b[normalize-space()='Account Created!']");
  }

  //////Actions

  async userRegister(
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string
  ) {
    await step('Register user info', async () => {
      await this.mr_Checkbox.click();
      await this.password_Input.fill(password);
      await this.firstName_Input.fill(firstName);
      await this.lastName_Input.fill(lastName);
      await this.address_Input.fill(address);
      await this.state_Input.fill(state);
      await this.city_Input.fill(city);
      await this.zipcode_Input.fill(zipcode);
      await this.mobileNumber_Input.fill(mobileNumber);
      await this.createAccount_Button.click();
    });
  }

  /////Validations

  async verifyAccountCreatedSuccessfully(creationText: string) {
    await step(`Verify that user is navigated to login page`, async () => {
      await expect(this.creation_Text).toHaveText(creationText);
    });
  }
}
