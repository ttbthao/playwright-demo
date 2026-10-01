import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

  await expect(page).toHaveURL(/inventory/);
});

test("login with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login("invalid_user", "invalid_pass");

  await expect(loginPage.loginError).toContainText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
