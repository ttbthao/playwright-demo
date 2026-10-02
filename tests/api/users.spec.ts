import { test, expect } from "../../fixtures/api.fixture";

test("Get users API - authenticated", async ({ usersApi }) => {
  const response = await usersApi.getUsers();

  expect(response.status()).toBe(200);

  await expect(response).toBeOK();

  const body = await response.json();

  expect(body.data).toEqual(expect.any(Array));

  for (const user of body.data) {
    expect(user.id).toEqual(expect.any(Number));
    expect(user.email).toEqual(expect.any(String));
    expect(user.firstName).toEqual(expect.any(String));
    expect(user.lastName).toEqual(expect.any(String));
  }
});
