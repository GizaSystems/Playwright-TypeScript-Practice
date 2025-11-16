import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class SignupPage {
  readonly page: Page;
  
  // Locators
  readonly radioButtonGender1_Input: Locator;
  readonly password_Input: Locator;
  readonly days_Input: Locator;
  readonly months_Input: Locator;
  readonly years_Input: Locator;
  readonly firstName_Input: Locator;
  readonly lastName_Input: Locator;
  readonly company_Input: Locator;
  readonly address1_Input: Locator;
  readonly state_Input: Locator;
  readonly city_Input: Locator;
  readonly zipCode_Input: Locator;
  readonly mobileNumber_Input: Locator;
  readonly country_Input: Locator;
  readonly createAccount_Button: Locator;
  readonly createAccountSuccess_link: Locator;
  readonly continue_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.radioButtonGender1_Input = page.locator('[id="id_gender1"]');
    this.password_Input = page.locator('[id="password"]');
    this.days_Input = page.locator('[id="days"]');
    this.months_Input = page.locator('[id="months"]');
    this.years_Input = page.locator('[id="years"]');
    this.firstName_Input = page.locator('[id="first_name"]');
    this.lastName_Input = page.locator('[id="last_name"]');
    this.company_Input = page.locator('[id="company"]');
    this.address1_Input = page.locator('[id="address1"]');
    this.state_Input = page.locator('[id="state"]');
    this.city_Input = page.locator('[id="city"]');
    this.zipCode_Input = page.locator('[id="zipcode"]');
    this.mobileNumber_Input = page.locator('[id="mobile_number"]');
    this.createAccount_Button = page.locator('[data-qa="create-account"]');
    this.createAccountSuccess_link = page.locator('//*[@data-qa="account-created"]/b');
    this.continue_Button = page.locator('[data-qa="continue-button"]');
  }

  ///// Actions

  async fillSignupInfo(password: string, days: string, months: string, years: string, firstName: string, lastName: string,
    company: string, address1: string, state: string, city: string, zipCode: string, mobileNumber: string) {
    await step(`Fill Signup Info`, async () => {
      await this.radioButtonGender1_Input.click();
      await this.password_Input.fill(password);
      await this.days_Input.selectOption(days); 
      await this.months_Input.selectOption(months);
      await this.years_Input.selectOption(years);
      await this.firstName_Input.fill(firstName);
      await this.lastName_Input.fill(lastName);
      await this.company_Input.fill(company);
      await this.address1_Input.fill(address1);
      await this.state_Input.fill(state);
      await this.city_Input.fill(city);
      await this.zipCode_Input.fill(zipCode);
      await this.mobileNumber_Input.fill(mobileNumber);
      await this.createAccount_Button.click();
    });
  }

  ///// Validations

    async assertUserCreatedSuccessfully(massage: string) {
        await step("Assert User is Created Successfully", async () => {
          await expect(this.createAccountSuccess_link).toContainText(massage);
          await this.continue_Button.click();
        });
      }

}