import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';

export class HomePage {
  page: Page;
  products: Locator;
  prices: Locator;
  headerFragment: HeaderFragment;
  handToolsCategory: Locator;
  powerToolsCategory: Locator;
  othersCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.products = this.page.getByTestId('product-name');
    this.prices = this.page.getByTestId('product-price');
    this.handToolsCategory = this.page.getByLabel('Hand Tools', {
      exact: true,
    });
    this.powerToolsCategory = this.page.getByLabel('Power Tools', {
      exact: true,
    });
    this.othersCategory = this.page.getByLabel('Other', {
      exact: true,
    });
  }

  async selectProduct(productName: string): Promise<void> {
    await this.products.filter({ hasText: productName }).click();
  }

  async getProductNames(): Promise<string[]> {
    return await this.products.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.prices.allTextContents();

    return prices.map((price: string) => Number(price.replace('€', '').trim()));
  }

  async selectPowerTool(tool: string): Promise<void> {
    await this.page.getByLabel(tool, { exact: true }).check();
  }
}