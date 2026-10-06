import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("checkout - should complete an order successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();

  await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

  await expect(page).toHaveURL(/inventory/);

  // Add products
  await inventoryPage.addProductToCart("Sauce Labs Backpack");
  await inventoryPage.addProductToCart("Sauce Labs Onesie");

  await expect(inventoryPage.shoppingCartBadge).toHaveText("2");

  // Cart
  await inventoryPage.openCart();

  await expect(cartPage.product("Sauce Labs Backpack")).toBeVisible();

  await expect(cartPage.product("Sauce Labs Onesie")).toBeVisible();

  await cartPage.checkout();

  // Checkout information
  await checkoutPage.fillCustomerInformation("Test", "User", "70000");

  await checkoutPage.continue();

  // Checkout overview
  await expect(checkoutPage.overviewTitle).toBeVisible();

  await expect(checkoutPage.item("Sauce Labs Backpack")).toBeVisible();

  await expect(checkoutPage.item("Sauce Labs Onesie")).toBeVisible();

  // Verify price calculation
  const subtotal = await checkoutPage.getSubtotal();
  const tax = await checkoutPage.getTax();
  const total = await checkoutPage.getTotal();

  expect(total).toBeCloseTo(subtotal + tax, 2);

  // Finish order
  await checkoutPage.finish();

  // Verify success
  await expect(checkoutPage.successMessage).toBeVisible();
});
