import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly shoppingCartBadge: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutButton = page.getByRole("button", {
      name: "Checkout",
    });
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
    this.cartItems = page.locator(".cart_item");
  }

  async gotoCart() {
    await this.goto("/cart.html");
  }

  product(productName: string): Locator {
    return this.page.getByText(productName, { exact: true });
  }

  cartItem(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  async removeProduct(productName: string) {
    const item = this.cartItem(productName);
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
