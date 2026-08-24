import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
    page: Page;
    homeButton: Locator;
    categoriesButton: Locator;
    contactButton: Locator;
    signInButton: Locator;
    languageSelectorButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.homeButton = this.page.getByTestId("nav-home");
        this.categoriesButton = this.page.getByTestId("nav-categories");
        this.contactButton = this.page.getByTestId("nav-contact");
        this.signInButton = this.page.getByTestId("nav-sign-in");
        this.languageSelectorButton = this.page.getByTestId("language-select");
    }
}