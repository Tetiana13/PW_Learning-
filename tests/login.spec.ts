import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/auth/login');
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
    await expect(page.getByTestId("page-title")).toHaveText('My account');
    await expect(page.getByText('Jane Doe')).toBeVisible();
}); 