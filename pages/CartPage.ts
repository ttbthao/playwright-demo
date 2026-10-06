import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutButton = page.getByRole("button", {
      name: "Checkout",
    });
  }

  product(productName: string): Locator {
    return this.page.getByText(productName, { exact: true });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}