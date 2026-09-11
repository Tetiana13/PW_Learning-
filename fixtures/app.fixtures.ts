import { test as base, expect } from '@playwright/test';
import { App } from '../pages/app';
import { users } from '../data/auth';


type Fixtures = {
  app: App;
  loggedInApp: App;
};

type LoginResponse = {
  access_token: string;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new App(page));
  },

  loggedInApp: async ({ app, request }, use) => {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      throw new Error('API_URL environment variable is required to log in');
    }

    const response = await request.post(
      `${apiUrl}/users/login`,
      {
        data: {
          email: users.customer_1.login,
          password: users.customer_1.password,
        },
     },
    );

    expect(response.ok()).toBeTruthy();
    const jsonData = (await response.json()) as LoginResponse;
    const token = jsonData.access_token;

    await app.page.goto('/');

    await app.page.evaluate((token) => {
      localStorage.setItem('auth-token', token);
    }, token);

    await app.page.goto('/account');

    await expect(app.page).toHaveURL('/account');

    await use(app);
  },
});

export { expect };