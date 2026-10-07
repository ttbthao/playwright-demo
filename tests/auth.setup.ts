import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const authFile = ".auth/user.json";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    process.env.TEST_USERNAME!,
    process.env.TEST_PASSWORD!,
  );

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: authFile,
  });
});