import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";

test.describe("Cart - Remove products", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await inventoryPage.gotoInventory();
  });

  test("should remove a product from cart page and update cart badge", async () => {
    const item1 = "Sauce Labs Backpack";
    const item2 = "Sauce Labs Bike Light";

    await test.step("Add 2 products to cart", async () => {
      await inventoryPage.addProductToCart(item1);
      await inventoryPage.addProductToCart(item2);
      await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
    });

    await test.step("Open cart and verify initial items", async () => {
      await inventoryPage.openCart();
      await expect(cartPage.product(item1)).toBeVisible();
      await expect(cartPage.product(item2)).toBeVisible();
      await expect(cartPage.shoppingCartBadge).toHaveText("2");
    });

    await test.step("Remove 1 product from cart", async () => {
      await cartPage.removeProduct(item1);
      await expect(cartPage.product(item1)).toBeHidden();
      await expect(cartPage.product(item2)).toBeVisible();
      await expect(cartPage.shoppingCartBadge).toHaveText("1");
    });
  });

  test("should remove all products from cart page and hide badge", async () => {
    const item = "Sauce Labs Backpack";

    await test.step("Add product and open cart", async () => {
      await inventoryPage.addProductToCart(item);
      await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
      await inventoryPage.openCart();
    });

    await test.step("Remove product from cart and verify empty cart", async () => {
      await cartPage.removeProduct(item);
      await expect(cartPage.product(item)).toBeHidden();
      await expect(cartPage.cartItems).toHaveCount(0);
      await expect(cartPage.shoppingCartBadge).toBeHidden();
    });
  });
});
