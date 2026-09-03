import { Locator, Page } from '@playwright/test';

export class SideBarFragments {
  page: Page;
  sortDropdown: Locator;
  searchField: Locator;
  searchSubmitButton: Locator;
  searchReset: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = this.page.getByTestId('sort');
    this.searchField = this.page.getByTestId('search-query');
    this.searchSubmitButton = this.page.getByTestId('search-submit');
    this.searchReset = this.page.getByTestId('search-reset');
  }
}