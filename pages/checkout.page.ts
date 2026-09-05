import { expect, Locator, Page } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';

export class CheckoutPage {
  page: Page;
  headerFragment: HeaderFragment;
  getProductRow: Locator;
  productTitle: Locator;
  productPrice: Locator;
  totalPrice: Locator;
  proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.getProductRow = this.page.locator('table tbody tr');
    this.productTitle = this.page.getByTestId('product-title');
    this.productPrice = this.page.getByTestId('product-price');
    this.proceedToCheckoutButton = this.page.getByTestId('/proceed-d+/);');
    this.totalPrice = this.page.getByTestId('cart-total');
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
  
}