import { Page } from '@playwright/test';

import { LoginPage } from './login.page';
import { MyAccountPage } from './account.page';
import { HomePage } from './home.page';
import { CheckoutPage } from './checkout.page';
import { ProductDetailsPage } from './productDetails.page';
export class App {
  page: Page;
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  homePage: HomePage;
  checkoutPage: CheckoutPage;
  productDetailsPage: ProductDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.myAccountPage = new MyAccountPage(page);
    this.homePage = new HomePage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.productDetailsPage = new ProductDetailsPage(page);
  }
}