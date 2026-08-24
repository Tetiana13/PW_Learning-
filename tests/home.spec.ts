import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetailsPage } from '../pages/productDetails.page';

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const productName = 'Combination Pliers';
  
    await page.goto('/');
    await homePage.selectProduct(productName);
    await expect(page).toHaveURL(/product/);
    await expect(productDetailsPage.productName).toHaveText(productName);
    await expect(productDetailsPage.productPrice).toHaveText('14.15');
    await expect(productDetailsPage.addToCartButton).toBeVisible();
    await expect(productDetailsPage.addToFavoriteButton).toBeVisible();
}); 