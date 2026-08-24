import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
    page: Page;
    homeButton: Locator;
    categoriesButton: Locator;
    contactButton: Locator;
    signInButton: Locator;
    languageSelectorButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.homeButton = this.page.getByTestId("nav-home");
        this.categoriesButton = this.page.locator('[data-test="nav-categories"]');
        this.contactButton = this.page.locator('[data-test="nav-contact"]');
        this.signInButton = this.page.locator('[data-test="nav-sign-in"]');
        this.languageSelectorButton = this.page.locator('[data-test="language-select"]');
    }
}