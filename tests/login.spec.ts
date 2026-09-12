import { expect, test } from '../fixtures/app.fixtures';


test('Login with valid credentials', async ({ loggedInApp }) => {
  await loggedInApp.page.goto('/account');

  await expect(loggedInApp.page).toHaveURL('/account');
  await expect(loggedInApp.myAccountPage.pageTitle).toHaveText('My account');
  await expect(loggedInApp.myAccountPage.userName).toBeVisible(); 
});