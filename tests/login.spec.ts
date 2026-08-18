import { test, expect } from '@playwright/test';


test('Login with valid credentials', async ({ page }) => {

  await page.goto('/auth/login');
  await page.locator('[id="email"]').isVisible();
  
  await page.locator('[id="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[id="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
  await expect(page.getByText('Jane Doe')).toBeVisible;

}); 