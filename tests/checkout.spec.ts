import { expect, test } from '../fixtures/app.fixtures';

test('Buy this product', async ({ loggedInApp }) => {

  await loggedInApp.page.goto('/');
  const product = await loggedInApp.homePage.getFirstProductDetails();
  await loggedInApp.homePage.selectFirstProduct();
  await loggedInApp.productDetailsPage.addToCartButton.click();
  await expect(loggedInApp.productDetailsPage.addToCartNotification).toHaveText(
    'Product added to shopping cart.',
  );
  await expect(loggedInApp.productDetailsPage.addToCartNotification).toBeHidden({ timeout: 8000 });
  await loggedInApp.productDetailsPage.headerFragment.cartButton.click();

  await expect(loggedInApp.checkoutPage.proceedToCheckoutButton).toBeVisible();
  await loggedInApp.checkoutPage.verifyProduct(
    product.name,
    product.price,
  );
  await loggedInApp.checkoutPage.verifyTotalEqualsProductPrice();
  // перевірка на логін
  await loggedInApp.checkoutPage.proceedToCheckoutButton.click();


});