import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly loginError;
  readonly title;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder("Username");

    this.passwordInput = page.getByPlaceholder("Password");

    this.loginButton = page.getByRole("button", { name: "Login" });

    this.title = page.getByText('Products', { exact: true });

    this.loginError = page.getByRole("alert");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
