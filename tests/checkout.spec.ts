import { Country } from '../data/countries';
import { expect, test } from '../fixtures/app.fixtures';
import { PaymentMethod } from '../data/payment';

test('Successful payment with credit card', async ({ loggedInApp }) => {
  await loggedInApp.page.goto('/');

  await expect(loggedInApp.page).toHaveURL('/');
  const product = await loggedInApp.homePage.getFirstProductDetails();
  await loggedInApp.homePage.selectFirstProduct();
  await loggedInApp.productDetailsPage.addToCartButton.click();
  await expect(loggedInApp.productDetailsPage.addToCartNotification).toHaveText(
    'Product added to shopping cart.',
  );
  await expect(loggedInApp.productDetailsPage.addToCartNotification).toBeHidden({ timeout: 8000 });
  await loggedInApp.productDetailsPage.headerFragment.cartButton.click();
  await loggedInApp.checkoutPage.verifyProduct(product.name, product.price);
  await loggedInApp.checkoutPage.verifyTotalEqualsProductPrice();
  await loggedInApp.checkoutPage.clickProceed(1);
  await loggedInApp.checkoutPage.verifyAlreadyLoggedIn();
  await loggedInApp.checkoutPage.clickProceed(2);
  await loggedInApp.checkoutPage.selectCountry(Country.Italy);
  await loggedInApp.checkoutPage.billingPostCode.fill('30100');
  await loggedInApp.checkoutPage.billingAddressHouseNumber.fill('22');
  await loggedInApp.checkoutPage.billingState.fill('Veneto');
  await loggedInApp.checkoutPage.clickProceed(3);

  await loggedInApp.checkoutPage.selectPaymentMethod(PaymentMethod.CreditCard);
  await loggedInApp.checkoutPage.fillPaymentDetails();
  await loggedInApp.checkoutPage.paymentConfirmButton.click();
  await loggedInApp.checkoutPage.verifyPaymentSuccess();
});