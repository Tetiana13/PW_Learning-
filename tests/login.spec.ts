import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { MyAccountPage } from '../pages/account.page';
import { authFile } from '../utils/auth';

const authData = {
  login: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};

test.skip(!!process.env.CI, 'Skip on CI due to Cloudflare verification');

test.use({ storageState: authFile });

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const myAccountPage = new MyAccountPage(page);

  await page.goto('/auth/login');
  await loginPage.performLogin(authData.login, authData.password);
  await expect(page).toHaveURL('/account');
  await expect(myAccountPage.pageTitle).toHaveText('My account');
  await expect(myAccountPage.userName).toBeVisible();
  await page.context().storageState({ path: authFile });
});