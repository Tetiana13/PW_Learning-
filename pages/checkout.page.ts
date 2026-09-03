import { expect, Locator, Page } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';

export class CheckoutPage {
  page: Page;
  headerFragment: HeaderFragment;
  getProductRow: Locator;
  productTitle: Locator;
  proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.getProductRow = this.page.locator('table tbody tr');
    this.productTitle = this.page.getByTestId('product-title');
    this.proceedToCheckoutButton = this.page.getByTestId('proceed-1');
  }

  async verifyProductQuantity(productName: string, quantity: number) {
    const row = this.getProductRow.filter({ hasText: productName });

    await expect(row.getByTestId('product-quantity')).toHaveValue(String(quantity));
  }
}