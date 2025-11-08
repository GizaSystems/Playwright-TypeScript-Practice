import { APIResponse, expect, type APIRequestContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ApiActions } from '../utils/ApiActions';

export class ApisUserManagement {
  readonly request: APIRequestContext;
  readonly apiActions: ApiActions;
  // readonly baseURL = 'https://automationexercise.com';   // todos: Should handle the base URL from the config file
  readonly createUser_serviceName = '/api/createAccount';

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiActions = new ApiActions(request);
  }

  async createUser(name: string, email: string, password: string): Promise<APIResponse> {
    return await allure.step(`Create User Account with name: ${name}, First Name: ${email} and Last Name: ${password}`,
      async () => {
        const userData = {
          name: name,
          email: email,
          password: password,
          title: 'mr',
          birth_date: '04',
          birth_month: '09',
          birth_year: '1994',
          firstname: 'Mahmoud',
          lastname: 'ElSharkawy',
          company: 'Giza Systems',
          address1: 'Cairo',
          address2: 'ElObour',
          country: 'India',
          zipcode: '20100',
          state: 'Cairo',
          city: 'ElObour',
          mobile_number: '01155150745'
        }
        const response = await this.apiActions.post(this.createUser_serviceName, { form: userData });
        return response;
      }
    );
  }
  async verifyUserCreatedSuccessfully(createResponse: APIResponse) {
    await allure.step(`verify User Created Successfully`, async () => {
      expect(createResponse.status()).toBe(200);
    });
  }
  async loginUser(email: string, password: string): Promise<APIResponse> {
    return await allure.step(`Login User with Email: ${email} and Password: ${password}`,
      async () => {
        const loginData = {
          email: email,
          password: password
        }
        const response = await this.apiActions.post('/api/verifyLogin', { form: loginData });
        return response;
      }
    );
  }
  async verifyUserLogedinSuccessfully(loginResponse: APIResponse, loginJson: { message: string }) {
    await allure.step(`verify User logedin Successfully`, async () => {
      expect(loginResponse.status()).toBe(200);
      expect(loginJson.message).toBe("User exists!");
    });
  }
  async logoutUser(): Promise<APIResponse> {
    return await allure.step(`Logout User`,
      async () => {
        const response = await this.apiActions.get('/logout');
        return response;
      }
    );
  }
  // async verifyLogoutRequestNotHandledThroughTheApi(logoutResponse: APIResponse) {
  //   await allure.step(`verify Logout Request Not Handled Through The Api`, async () => {
  //     expect(logoutResponse.status()).toBe(500);
  //   });
  // }

}
