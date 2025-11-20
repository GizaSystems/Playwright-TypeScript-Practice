import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class ContactUsFormPage {
  readonly page: Page;

  // Locators
  readonly pageSubTitle: Locator;
  readonly userName_Input: Locator;
  readonly userEmail_Input: Locator;
  readonly subject_Input: Locator;
  readonly message_Input: Locator;
  readonly file: Locator;
  readonly submitButton:Locator;
  readonly successMessage:Locator;
  readonly homePageButton:Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageSubTitle = page.locator('//div[@class="contact-form"]//h2');
    this.userName_Input = page.locator('//input[@data-qa="name"]');
    this.userEmail_Input = page.locator('//input[@data-qa="email"]');
    this.subject_Input = page.locator('//input[@data-qa="subject"]');
    this.message_Input = page.locator('//textarea[@data-qa="message"]');
    this.file = page.locator('//input[@type="file"]');
    this.submitButton = page.locator('//input[@data-qa="submit-button"]');
    this.successMessage = page.locator('#contact-page .status.alert.alert-success');
    this.homePageButton = page.locator('//a[@class="btn btn-success"]');
  }

  /*methods*/

  async fillInContactUsForm(username: string, useremail: string,subjectInput: string,messageTextArea: string) {
    await step(`Fill in contact us form with data}`, async () => {
      await this.userName_Input.fill(username);
      await this.userEmail_Input.fill(useremail);
      await this.subject_Input.fill(subjectInput);
      await this.message_Input.fill(messageTextArea);
    });
  }

    async uploadFile(filePath: string) {
    await step(`Upload file in contact us form}`, async () => {
      await this.file.setInputFiles(filePath);
    });
  }
async submitContactUsForm() {
    await step(`Submit contact us form`, async () => {
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        await this.submitButton.click();
    });
}

  async navigateBackToHomePage()
  {
await step(`Navigate to Home page}`, async () => {
      await this.homePageButton.click();
  });
  
  /*assertion*/

  }
  async assertOnConatctUsPageIsVisible(subTitle: string) {
    await step('Verify get in touch title is visible', async () => {
        await expect(this.pageSubTitle).toHaveText(subTitle);

    });
}

async assertOnSuccessMessage(successMsg : string) {
    await step('Verify success message after submit contact us form is visible', async () => {
        await expect(this.successMessage).toHaveText(successMsg);

    });
}
  }