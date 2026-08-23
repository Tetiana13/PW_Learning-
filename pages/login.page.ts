import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/ HeaderFragment";

export class LoginPage {

    page: Page;
    headerFragment: HeaderFragment;
    emailField: Locator;
    passwordField: Locator;
    submitButton: Locator;
    constructor(page: Page){
        this.page = page;
        this.headerFragment = new HeaderFragment(page);
        this.emailField = this.page.locator('[id="email"]');
        this.passwordField = this.page.locator('[id="password"]');
        this.submitButton = this.page.locator('[data-test="login-submit"]');
    }

    async performLogin(email:string, password:string): Promise<void> {

        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        
        await this.submitButton.click();    
    }
}