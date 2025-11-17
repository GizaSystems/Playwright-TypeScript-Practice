import { expect, Locator, Page } from '@playwright/test';
import { step } from 'allure-js-commons';

export class SignupPage {
    readonly page: Page;

    // Locators
    readonly title_RadioButton: Locator;
    readonly password_Input: Locator;
    readonly days_List: Locator;
    readonly months_List: Locator;
    readonly years_List: Locator;
    readonly newsletter_Checkbox: Locator;
    readonly specialOffers_Checkbox: Locator;
    readonly firstName_Input: Locator;
    readonly lastName_Input: Locator;
    readonly company_Input: Locator;
    readonly address_Input: Locator;
    readonly address2_Input: Locator;
    readonly country_List: Locator;
    readonly state_Input: Locator;
    readonly city_Input: Locator;
    readonly zipcode_Input: Locator;
    readonly mobileNumer_Input: Locator;
    readonly createAccount_Button: Locator;
    readonly accountCreated_Header: Locator;
    readonly continue_Button: Locator;

    constructor(page: Page){
        this.page = page;
        this.title_RadioButton = page.getByLabel('Mrs.');
        this.password_Input = page.locator("//input[@id='password']");
        this.days_List = page.locator('//select[@id="days"]');
        this.months_List = page.locator('//select[@id="months"]');
        this.years_List = page.locator('//select[@id="years"]');
        this.newsletter_Checkbox = page.locator('#newsletter');
        this.specialOffers_Checkbox = page.locator('#optin');
        this.firstName_Input = page.locator('//input[@data-qa="first_name"]');
        this.lastName_Input = page.locator('//input[@data-qa="last_name"]');
        this.company_Input = page.locator('//input[@data-qa="company"]');
        this.address_Input = page.locator('//input[@data-qa="address"]');
        this.address2_Input = page.locator('//input[@data-qa="address2"]');
        this.country_List = page.locator('#country');
        this.state_Input = page.locator('//input[@data-qa="state"]');
        this.city_Input = page.locator('//input[@data-qa="city"]');
        this.zipcode_Input = page.locator('//input[@data-qa="zipcode"]');
        this.mobileNumer_Input = page.locator('//input[@data-qa="mobile_number"]');
        this.createAccount_Button = page.locator("button[data-qa='create-account']"),
        this.accountCreated_Header= page.locator('//h2[@data-qa="account-created"]');
        this.continue_Button = page.locator('//a[@data-qa="continue-button"]');
        
    }

    // Actions
    async fillAccountInfo(title: string, password: string, day: string, month: string, year: string,
                          firstName: string, lastName: string, company: string, address: string, addess2: string, 
                          country: string, state: string, city: string, zipcode: string, mobileNumber: string
    ){
        await step('Fill Account Info', async () =>{
            await this.title_RadioButton.check();
            await this.password_Input.fill(password);
            await this.days_List.selectOption(day);
            await this.months_List.selectOption(month);
            await this.years_List.selectOption(year);
            await this.newsletter_Checkbox.check();
            await this.specialOffers_Checkbox.check();
            await this.firstName_Input.fill(firstName),
            await this.lastName_Input.fill(lastName),
            await this.company_Input.fill(company),
            await this.address_Input.fill(address),
            await this.address2_Input.fill(addess2),
            await this.country_List.selectOption(country),
            await this.state_Input.fill(state),
            await this.city_Input.fill(city),
            await this.zipcode_Input.fill(zipcode),
            await this.mobileNumer_Input.fill(mobileNumber)
            await this.createAccount_Button.click();
        });
    }

    // Validations
    async assertAccountCreated(accountCreatedMessage: string){
        await step('Assert Account Created', async () =>{
            await expect(this.accountCreated_Header).toContainText(accountCreatedMessage);
            await this.continue_Button.click();
        })
        
    }

    
}