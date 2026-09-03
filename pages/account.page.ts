import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';

export class MyAccountPage {
  page: Page;
  headerFragment: HeaderFragment;
  pageTitle: Locator;
  userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.pageTitle = this.page.getByTestId('page-title');
    this.userName = this.page.getByText('Jane Doe');
  }
}