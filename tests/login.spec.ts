import { expect, test } from '../fixtures/app.fixtures';

test('Login with valid credentials', { tag: ['@smoke', '@regression'] }, async ({ loggedInApp }) => {
  await test.step('Open account page', async () => {
    await loggedInApp.page.goto('/account');
    await expect(loggedInApp.page).toHaveURL('/account');
  });

  await test.step('Verify account details', async () => {
    await expect(loggedInApp.myAccountPage.pageTitle).toHaveText('My account');
    await expect(loggedInApp.myAccountPage.userName).toBeVisible();
  });
});
