import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/HeaderFragment";

export class LoginPage {
    page: Page;
    headerFragment: HeaderFragment;
    emailField: Locator;
    passwordField: Locator;
    submitButton: Locator;
    constructor(page: Page){
        this.page = page;
        this.headerFragment = new HeaderFragment(page);
        this.emailField = this.page.getByTestId("email");
        this.passwordField = this.page.getByTestId("password");
        this.submitButton = this.page.getByTestId("login-submit");
    }
    async performLogin(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        
        await this.submitButton.click();    
    }
}