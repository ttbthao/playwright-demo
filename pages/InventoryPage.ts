import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly openCartButton: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    super(page);

    this.openCartButton = page.getByTestId("shopping-cart-link");
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
  }

  async gotoInventory() {
    await this.goto("/inventory.html");
  }

  async addProductToCart(productName: string) {
    const product = this.page
      .locator(".inventory_item")
      .filter({ hasText: productName });

    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async openCart() {
    await this.openCartButton.click();
  }
}
