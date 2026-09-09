import { expect, test } from '../fixtures/app.fixtures';
import { PowerTools } from '../data/categories';

test('Verify user can view product details', async ({ app }) => {
  const productName = 'Combination Pliers';

  await app.page.goto('/');
  await app.homePage.selectProduct(productName);
  await expect(app.page).toHaveURL(/product/);
  await expect(app.productDetailsPage.productName).toHaveText(productName);
  await expect(app.productDetailsPage.productPrice).toHaveText('14.15');
  await expect(app.productDetailsPage.addToCartButton).toBeVisible();
  await expect(app.productDetailsPage.addToFavoriteButton).toBeVisible();
});

test('Verify user can add product to cart', async ({ app }) => {
  const productName = 'Slip Joint Pliers';

  await app.page.goto('/');
  await app.homePage.selectProduct(productName);
  await expect(app.productDetailsPage.productName).toHaveText(productName);
  await expect(app.productDetailsPage.productPrice).toHaveText('9.17');
  await app.productDetailsPage.addToCartButton.click();

  await expect(app.productDetailsPage.addToCartNotification).toHaveText(
    'Product added to shopping cart.',
  );
  await expect(app.productDetailsPage.addToCartNotification).toBeHidden({ timeout: 8000 });
  await expect(app.productDetailsPage.headerFragment.cartQuantity).toHaveText('1');
  await app.productDetailsPage.headerFragment.cartButton.click();
  await expect(app.page).toHaveURL('/checkout');

  await app.checkoutPage.verifyProductQuantity(productName, 1);
  await expect(app.checkoutPage.proceedToCheckoutButton).toBeVisible();
  await expect(app.checkoutPage.proceedToCheckoutButton).toBeEnabled();
});

const nameSortingOptions = [
  { label: 'Name (A - Z)', direction: 'asc' },
  { label: 'Name (Z - A)', direction: 'desc' },
];

nameSortingOptions.forEach(({ label, direction }) => {
  test(`Verify user can perform sorting by name ${label}`, async ({ app }) => {
    await app.page.goto('/');

    await app.homePage.sideBarFragment.sortDropdown.selectOption({
      label,
    });

    const names = await app.homePage.getProductNames();

    const sortedNames = [...names].sort((a, b) =>
      direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a),
    );

    expect(names).toEqual(sortedNames);
  });
});

const priceSortingOptions = [
  { label: 'Price (Low - High)', direction: 'asc' },
  { label: 'Price (High - Low)', direction: 'desc' },
];

priceSortingOptions.forEach(({ label, direction }) => {
  test(`Verify user can perform sorting by price ${label}`, async ({ app }) => {
    await app.page.goto('/');

    await app.homePage.sideBarFragment.sortDropdown.selectOption({
      label,
    });

    const prices = await app.homePage.getProductPrices();

    const sortedPrices = [...prices].sort((a, b) =>
      direction === 'asc' ? a - b : b - a,
    );

    expect(prices).toEqual(sortedPrices);
  });
});

test('Verify user can filter products by category', async ({ app }) => {
  await app.page.goto('/');
  await app.homePage.selectPowerTool(PowerTools.Sander);

  await expect.poll(async () => {
    const productNames = await app.homePage.getProductNames();
    return productNames.every((name) => name.includes(PowerTools.Sander));
  }).toBeTruthy();
});