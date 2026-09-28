import 'dotenv/config';
import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';

export class MyAccountPage {
  page: Page;
  headerFragment: HeaderFragment;
  pageTitle: Locator;
  userName: Locator;

  constructor(page: Page) {
    const userName = process.env.USER_NAME;
    if (!userName) {
      throw new Error('USER_NAME environment variable is required');
    }

    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.pageTitle = this.page.getByTestId('page-title');
    this.userName = this.page.getByText(userName);
  }
}