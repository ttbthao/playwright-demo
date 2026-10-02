import { test, expect } from "../../fixtures/api.fixture";

test("Get users API - authenticated", async ({ usersApi }) => {
  const response = await usersApi.getUsers();

  expect(response.status()).toBe(200);
});
