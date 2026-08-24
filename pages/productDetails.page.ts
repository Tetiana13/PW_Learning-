import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/HeaderFragment";

export class ProductDetailsPage {
    page: Page;
    headerFragment: HeaderFragment;
    productName: Locator;
    productPrice: Locator;
    addToCartButton: Locator;
    addToFavoriteButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.headerFragment = new HeaderFragment(page);
        this.productName = this.page.getByTestId("product-name");
        this.productPrice = this.page.getByTestId("unit-price");
        this.addToCartButton = this.page.getByTestId("add-to-cart");
        this.addToFavoriteButton = this.page.getByTestId("add-to-favorites");
    }
}