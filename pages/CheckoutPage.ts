import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  readonly continueButton: Locator;
  readonly finishButton: Locator;

  readonly overviewTitle: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postalCodeInput = page.getByPlaceholder("Zip/Postal Code");

    this.continueButton = page.getByRole("button", {
      name: "Continue",
    });

    this.finishButton = page.getByRole("button", {
      name: "Finish",
    });

    this.overviewTitle = page.getByText("Checkout: Overview");

    this.subtotal = page.getByTestId("subtotal-label");
    this.tax = page.getByTestId("tax-label");
    this.total = page.getByTestId("total-label");

    this.successMessage = page.getByText(
      "Thank you for your order!"
    );
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  item(productName: string): Locator {
    return this.page.getByText(productName, { exact: true });
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotal.textContent();

    return Number(text?.replace("Item total: $", ""));
  }

  async getTax(): Promise<number> {
    const text = await this.tax.textContent();

    return Number(text?.replace("Tax: $", ""));
  }

  async getTotal(): Promise<number> {
    const text = await this.total.textContent();

    return Number(text?.replace("Total: $", ""));
  }
}