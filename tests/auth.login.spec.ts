import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/login.page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const authDir = path.dirname(authFile);

if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

if (!fs.existsSync(authFile)) {
  fs.writeFileSync(authFile, JSON.stringify({ cookies: [], origins: [] }, null, 2));
}

const authData = {
  login: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};

test.skip(!!process.env.CI, 'Skip on CI due to Cloudflare verification');

test.use({ storageState: authFile });

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');
  await loginPage.performLogin(authData.login, authData.password);
  await expect(page).toHaveURL('/account');

  await page.context().storageState({ path: authFile });
});