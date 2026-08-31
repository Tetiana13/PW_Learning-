import { expect, test } from '@playwright/test';
import { PowerTools } from '../data/categories';
import { HeaderFragment } from '../fragments/HeaderFragment';
import { SideBarFragments } from '../fragments/SideBarFragments';
import { CheckoutPage } from '../pages/checkout.page';
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

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailsPage = new ProductDetailsPage(page);
  const headerFragment = new HeaderFragment(page);
  const checkoutPage = new CheckoutPage(page);
  const productName = 'Slip Joint Pliers';

  await page.goto('/');
  await homePage.selectProduct(productName);
  await expect(productDetailsPage.productName).toHaveText(productName);
  await expect(productDetailsPage.productPrice).toHaveText('9.17');
  await productDetailsPage.addToCartButton.click();

  await expect(productDetailsPage.addToCartNotification).toHaveText(
    'Product added to shopping cart.',
  );
  await expect(productDetailsPage.addToCartNotification).toBeHidden({ timeout: 8000 });
  await expect(headerFragment.cartQuantity).toHaveText('1');
  await headerFragment.cartButton.click();
  await expect(page).toHaveURL('/checkout');

  await checkoutPage.verifyProductQuantity(productName, 1);
  await expect(checkoutPage.proceedToCheckoutButton).toBeVisible();
});

test('Verify user can perform sorting by name (asc & desc)', async ({ page }) => {
  const sideBarFragments = new SideBarFragments(page);
  const homePage = new HomePage(page);

  await page.goto('/');

  await sideBarFragments.sortDropdown.selectOption({
    label: 'Name (A - Z)',
  });

  const namesAsc = await homePage.getProductNames();

  expect(namesAsc).toEqual([...namesAsc].sort((a, b) => a.localeCompare(b)));

  await sideBarFragments.sortDropdown.selectOption({
    label: 'Name (Z - A)',
  });

  const namesDesc = await homePage.getProductNames();

  expect(namesDesc).toEqual([...namesDesc].sort((a, b) => b.localeCompare(a)));
});

test('Verify user can perform sorting by price (asc & desc)', async ({ page }) => {
  const sideBarFragments = new SideBarFragments(page);
  const homePage = new HomePage(page);

  await page.goto('/');

  await sideBarFragments.sortDropdown.selectOption({
    label: 'Price (High - Low)',
  });
  const pricesHighLow = await homePage.getProductPrices();

  expect(pricesHighLow).toEqual([...pricesHighLow].sort((a, b) => b - a));

  await sideBarFragments.sortDropdown.selectOption({
    label: 'Price (Low - High)',
  });

  const pricesLowHigh = await homePage.getProductPrices();

  expect(pricesLowHigh).toEqual([...pricesLowHigh].sort((a, b) => a - b));
});

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto('/');
  await homePage.selectPowerTool(PowerTools.Sander);

  await expect.poll(async () => {
    const productNames = await homePage.getProductNames();
    return productNames.every((name) => name.includes(PowerTools.Sander));
  }).toBeTruthy();
});