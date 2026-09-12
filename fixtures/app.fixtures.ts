import { test as base, expect } from '@playwright/test';
import { App } from '../pages/app';
import { users } from '../data/auth';
import { performApiLoginRequest } from '../api/login.api';


type Fixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new App(page));
  },

  loggedInApp: async ({ app, request }, use) => {
    const respData = await performApiLoginRequest(request, {
       email: users.customer_1.login,
       password: users.customer_1.password
    });

    await app.setAuthToken(respData.access_token)
    await app.page.goto('/account', { waitUntil: 'domcontentloaded' });
    await use(app);
  },
});

export { expect };