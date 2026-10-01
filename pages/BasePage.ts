import type { Page } from "@playwright/test";

export class BasePage {
  constructor(readonly page: Page) {}

  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }
}
