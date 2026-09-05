import { expect, test } from '../fixtures/app.fixtures';

import { authFile } from '../utils/auth';

const authData = {
  login: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};

test.skip(!!process.env.CI, 'Skip on CI due to Cloudflare verification');

test('Login with valid credentials', async ({ app }) => {
  await app.page.goto('/auth/login');

  await app.loginPage.performLogin(authData.login, authData.password);

  await expect(app.page).toHaveURL('/account');
  await expect(app.myAccountPage.pageTitle).toHaveText('My account');
  await expect(app.myAccountPage.userName).toBeVisible();

  await app.page.context().storageState({ path: authFile });
});