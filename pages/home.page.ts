import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';
import { SideBarFragments } from '../fragments/SideBarFragments';

export class HomePage {
  page: Page;
  products: Locator;
  prices: Locator;
  headerFragment: HeaderFragment;
  sideBarFragment: SideBarFragments;
  handToolsCategory: Locator;
  powerToolsCategory: Locator;
  othersCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.sideBarFragment = new SideBarFragments(page);
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

    return prices.map((price: string) =>
      Number(price.replace(/[^0-9.-]/g, '')),
    );
  }

  async selectPowerTool(tool: string): Promise<void> {
    await this.page.getByLabel(tool, { exact: true }).check();
  }

  async getFirstProductDetails() {
  return {
    name: await this.products.first().innerText(),
    price: await this.prices.first().innerText(),
  };
  }

  async selectFirstProduct(): Promise<void> {
  await this.products.first().click();
  }
}