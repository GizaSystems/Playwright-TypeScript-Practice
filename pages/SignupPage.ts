import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class SignupPage {
  readonly page: Page;

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
    await step('register User info', async () => {
      await this.mr_checkbox.click();
      await this.password_field.fill(password);
      await this.firstName_field.fill(firstName);
      await this.lastName_field.fill(lastName);
      await this.address_field.fill(address);
      await this.state_field.fill(state);
      await this.city_field.fill(city);
      await this.zipcode_field.fill(zipcode);
      await this.mobileNumber_field.fill(mobileNumber);
      await this.createAccount_button.click();
    })
  }

  }
