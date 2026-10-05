import { expect } from "@playwright/test";
import { test } from "../../fixtures/db.fixture";

test("Create user - should save user correctly in database", async ({ db }) => {
  const userData = {
    email: `test-${Date.now()}@example.com`,
    firstName: "Test",
    lastName: "User",
    role: "user",
  };

  // Create
  const createdUser = await db.createUser(userData);

  // Verify created user
  expect(createdUser).toBeDefined();
  expect(createdUser).toMatchObject({
    email: userData.email,
    first_name: userData.firstName,
    last_name: userData.lastName,
    role: userData.role,
  });

  // Query database
  const user = await db.findUserByEmail(userData.email);

  expect(user).toBeDefined();
  expect(user).toMatchObject({
    email: userData.email,
    first_name: userData.firstName,
    last_name: userData.lastName,
    role: userData.role,
  });

  // Cleanup
  await db.deleteUserByEmail(userData.email);

  // Verify cleanup
  const deletedUser = await db.findUserByEmail(userData.email);

  expect(deletedUser).toBeUndefined();
});
