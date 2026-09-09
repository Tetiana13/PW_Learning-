import { test as base, expect } from '@playwright/test';
import { App } from '../pages/app';
import { users } from '../data/auth';

type Fixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new App(page));
  },
  loggedInApp: async ({ app }, use) => {
  await app.page.goto('/auth/login');
  await app.loginPage.performLogin(
    users.customer_1.login,
    users.customer_1.password,
  );
  await expect(app.page).toHaveURL('/account');
  await use(app);
},
});

export { expect };