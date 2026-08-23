import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/ HeaderFragment";

export class MyAccountPage {
  page: Page;
  headerFragment: HeaderFragment;
  pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.pageTitle = this.page.locator('[data-test="page-title"]');
  }
}