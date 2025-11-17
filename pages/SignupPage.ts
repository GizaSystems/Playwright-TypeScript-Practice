import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class SignupPage {
  readonly page: Page;
  readonly genderMale_radioButton: Locator;
  readonly signupPassword_Input: Locator;
  readonly newsLetter_CheckBox: Locator;
  readonly recieveSpecialOffers_CheckBox: Locator;
  readonly firstName_Input: Locator;
  readonly lastName_Input: Locator;
  readonly company_Input: Locator;
  readonly address_Input: Locator;
  readonly state_Input: Locator;
  readonly city_Input: Locator;
  readonly zipCode_Input: Locator;
  readonly mobileNumber_Input: Locator;
  readonly createAccount_Button: Locator;
  readonly accountCreated_Label: Locator;
  readonly enterAccountInfo_title: Locator;
  readonly accountCreated_title: Locator;
  readonly accountDeleted_title: Locator;
  readonly loggedInUser_Label: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.genderMale_radioButton = page.locator('#id_gender1');
    this.signupPassword_Input = page.locator('#password');
    this.newsLetter_CheckBox = page.locator('#newsletter');
    this.recieveSpecialOffers_CheckBox = page.locator('#optin');
    this.firstName_Input = page.locator('#first_name');
    this.lastName_Input = page.locator('#last_name');
    this.company_Input = page.locator('#company');
    this.address_Input = page.locator('#address1');
    this.state_Input = page.locator('#state');
    this.city_Input = page.locator('#city');
    this.zipCode_Input = page.locator('#zipcode');
    this.mobileNumber_Input = page.locator('#mobile_number');
    this.createAccount_Button = page.locator('[data-qa="create-account"]');
    this.accountCreated_Label = page.locator('[data-qa="account-created"]');
    this.enterAccountInfo_title = page.locator('h2', { hasText: 'Enter Account Information' });
    this.accountCreated_title = page.locator('h2', { hasText: 'Account Created!' });
    this.accountDeleted_title = page.locator('h2', { hasText: 'Account Deleted!' });
    this.loggedInUser_Label = page.locator('a:has(i.fa-user)');
  }

  //Actions

  async createNewAccount(password: string, day: string, month: string, year: string, firstName: string, lastName: string, company: string, address: string, countryName: string, state: string, city: string, zipCode: string, mobileNumber: string) {
    await step(`User Creates New Account With: password: ${password} ,day: ${day} ,month: ${month} ,year: ${year} , firstName: ${firstName}, lastName: ${lastName}, company: ${company}, address: ${address}, countryName: ${countryName}, state: ${state}, city: ${city}, zipCode: ${zipCode} and mobileNumber: ${mobileNumber}`, async () => {
      await this.genderMale_radioButton.click();
      await this.signupPassword_Input.fill(password);
      await this.selectDateOfBirth(day, month, year);
      await this.newsLetter_CheckBox.click();
      await this.recieveSpecialOffers_CheckBox.click();
      await this.firstName_Input.fill(firstName);
      await this.lastName_Input.fill(lastName);
      await this.company_Input.fill(company);
      await this.address_Input.fill(address);
      await this.selectCountry(countryName);
      await this.state_Input.fill(state);
      await this.city_Input.fill(city);
      await this.zipCode_Input.fill(zipCode);
      await this.mobileNumber_Input.fill(mobileNumber);
      await this.createAccount_Button.click();
    });
  }

  async selectCountry(countryName: any) {
    await this.page.locator('#country').selectOption({ label: countryName });
  }
  async selectDateOfBirth(day: string, month: string, year: string) {
    await step(`Select Date of Birth: ${day}-${month}-${year}`, async () => {
      await this.page.locator('#days').selectOption(day);
      await this.page.locator('#months').selectOption(month);
      await this.page.locator('#years').selectOption(year);
    });
  }
  //Assertions
  async assertTextEnterAccountInfoIsVisiable(expectedText: string) {
    await expect(this.enterAccountInfo_title).toHaveText(expectedText);
  }
  async assertTextAccountCreatedIsVisiable(expectedText: string) {
    await expect(this.accountCreated_title).toHaveText(expectedText);
  }
  async assertTextAccountDeletedIsVisiable(expectedText: string) {
    await expect(this.accountDeleted_title).toHaveText(expectedText);
  }
  async assertLoggedInUserName(expectedName: string) {
    await expect(this.loggedInUser_Label).toBeVisible();
    await expect(this.loggedInUser_Label).toContainText(expectedName);
  }

}