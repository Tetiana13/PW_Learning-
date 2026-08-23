import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/ HeaderFragment";

export class HomePage {
    page: Page;
    products: Locator;
    headerFragment: HeaderFragment;

    constructor(page:Page){
        this.page = page;
        this.headerFragment = new HeaderFragment(page);
        this.products = this.page.locator('[data-test="product-name"]');
    }

    async selectProduct (productName:string): Promise<void> {
        await this.products
            .filter({ hasText: productName })
            .first()
            .click();
    }

}