import { expect, Locator, Page } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';
import { PaymentMethod } from '../data/payment';
import { testCard } from '../data/payment';

export class CheckoutPage {
  page: Page;
  headerFragment: HeaderFragment;
  getProductRow: Locator;
  productTitle: Locator;
  productPrice: Locator;
  totalPrice: Locator;
  proceedToCheckoutButton: Locator;
  alreadyLoggedInMessage: Locator;
  billingCountry: Locator;
  billingPostCode: Locator;
  billingAddressHouseNumber: Locator;
  billingState: Locator;
  paymentMethodDropdown: Locator;
  paymentCreditCardNumber: Locator;
  paymentExpirationDate: Locator;
  paymentCVV: Locator;
  paymentCardHolderName: Locator;
  paymentConfirmButton: Locator;
  paymentSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.getProductRow = this.page.locator('table tbody tr');
    this.productTitle = this.page.getByTestId('product-title');
    this.productPrice = this.page.getByTestId('product-price');
    this.proceedToCheckoutButton = this.page.locator('[data-test^="proceed-"]:not([disabled])');
    this.totalPrice = this.page.getByTestId('cart-total');
    this.billingCountry = this.page.getByTestId('country');
    this.billingPostCode = this.page.getByTestId('postal_code');
    this.billingAddressHouseNumber = this.page.getByTestId('house_number');
    this.billingState = this.page.getByTestId('state');
    this.paymentMethodDropdown = this.page.getByTestId('payment-method');
    this.paymentCreditCardNumber = this.page.getByTestId('credit_card_number');
    this.paymentExpirationDate = this.page.getByTestId('expiration_date');
    this.paymentCVV = this.page.getByTestId('cvv');
    this.paymentCardHolderName = this.page.getByTestId('card_holder_name');
    this.paymentConfirmButton = this.page.getByTestId('finish');
    this.paymentSuccessMessage = this.page.getByTestId('payment-success-message');
    this.alreadyLoggedInMessage = this.page.getByText(
  'you are already logged in. You can proceed to checkout.',
);

  }

  async verifyProductQuantity(productName: string, quantity: number) {
    const row = this.getProductRow.filter({ hasText: productName });

    await expect(row.getByTestId('product-quantity')).toHaveValue(String(quantity));
  }
  async verifyProduct(productName: string, productPrice: string) {
    await expect(this.productTitle).toHaveText(productName);
    await expect(this.productPrice).toHaveText(productPrice);
  }

  async verifyTotalEqualsProductPrice() {
    await expect(this.totalPrice).toHaveText(
    await this.productPrice.innerText(),
  );
  }

  async clickProceed(step: number) {
    await this.page.getByTestId(`proceed-${step}`).click();
  }

  async verifyAlreadyLoggedIn(): Promise<void> {
    await expect(this.alreadyLoggedInMessage).toBeVisible();
  }

  async selectCountry(country: string): Promise<void> {
    await this.billingCountry.selectOption(country);
  }

  async selectPaymentMethod(method: PaymentMethod): Promise<void> {
  await this.paymentMethodDropdown.selectOption(method);
  }


  async fillPaymentDetails(): Promise<void> {
    await this.paymentCreditCardNumber.fill(testCard.cardNumber);

    await this.paymentExpirationDate.fill(
      testCard.getExpirationDate()
    );

    await this.paymentCVV.fill(testCard.cvv);

    await this.paymentCardHolderName.fill(
      testCard.cardHolderName
    );
  }

  async verifyPaymentSuccess(): Promise<void> {
  await expect(this.paymentSuccessMessage).toHaveText('Payment was successful');
  }
  
}