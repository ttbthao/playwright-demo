import { test, expect } from "@playwright/test";

import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("checkout - should complete an order successfully", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.gotoInventory();

  await test.step("Add products to cart", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Onesie");

    await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
  });

  await test.step("Verify cart", async () => {
    await inventoryPage.openCart();

    await expect(cartPage.product("Sauce Labs Backpack")).toBeVisible();
    await expect(cartPage.product("Sauce Labs Onesie")).toBeVisible();

    await cartPage.checkout();
  });

  await test.step("Fill checkout information", async () => {
    await checkoutPage.fillCustomerInformation("Test", "User", "70000");
    await checkoutPage.continue();
  });

  await test.step("Verify checkout overview", async () => {
    await expect(checkoutPage.overviewTitle).toBeVisible();
    await expect(checkoutPage.item("Sauce Labs Backpack")).toBeVisible();
    await expect(checkoutPage.item("Sauce Labs Onesie")).toBeVisible();
  });

  await test.step("Verify price calculation", async () => {
    await expect(checkoutPage.subtotal).toHaveText("Item total: $37.98");
    await expect(checkoutPage.tax).toHaveText("Tax: $3.04");
    await expect(checkoutPage.total).toHaveText("Total: $41.02");
  });

  await test.step("Complete order", async () => {
    await checkoutPage.finish();

    await expect(checkoutPage.successMessage).toBeVisible();
  });
});
