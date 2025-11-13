import { APIResponse, expect, type APIRequestContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ApiActions } from '../utils/ApiActions';

export class ApisUserManagement {
  readonly request: APIRequestContext;
  readonly apiActions: ApiActions;
  // readonly baseURL = 'https://automationexercise.com';   // todos: Should handle the base URL from the config file
  readonly createUser_serviceName = '/api/createAccount';
  readonly login_serviceName = '/api/verifyLogin';

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiActions = new ApiActions(request);
  }

  async createUser(name: string, email: string, password: string) {
  return await allure.step(
    `Create User Account with name: ${name}, email: ${email} and password:${password}`,
    async () => {
      const userData = {
        name,
        email,
        password,
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
      };

      const response = await this.apiActions.post(this.createUser_serviceName, { form: userData });
      const body = await response.json(); 
      return { response, body};
    }
  );
}
async login(email: string, password: string) {
  const response = await this.request.post(this.login_serviceName, {
    form: { email, password } // ✅ must use form data for this API
  });
  const body = await response.json();
  return { response, body };
}

  /////////Assertions
async assertCreateUserSuccess(response: APIResponse, body: any) {
    expect(body.responseCode).toBe(201);
    expect(body.message).toContain('User created!');
}
async assertLoginUserSuccess(response: APIResponse, body: any) {
  console.log('Login API Response:', body);
  expect(body.responseCode).toBe(200); 
  expect(body.message).toContain('User exists!');
}
}
