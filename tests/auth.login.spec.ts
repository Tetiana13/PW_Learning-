import { expect, test } from '../fixtures/app.fixtures';
import { authFile } from '../utils/auth';

test.skip(!!process.env.CI, 'Skip on CI due to Cloudflare verification');

test.use({ storageState: authFile });

test('Login with valid credentials', async ({ loggedInApp }) => {

  await expect(loggedInApp.page).toHaveURL('/account');
  await loggedInApp.page.context().storageState({ path: authFile });
  
});