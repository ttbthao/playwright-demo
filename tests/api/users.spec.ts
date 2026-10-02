import { test, expect } from "../../fixtures/api.fixture";

const userId = 1;

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

test("POST users - should create a new user", async ({ usersApi }) => {
  const userData = {
    email: `test-${Date.now()}@example.com`,
    firstName: "Test",
    lastName: "User",
    role: "user",
  };

  const response = await usersApi.createUser(userData);

  expect(response.status()).toBe(201);

  await expect(response).toBeOK();

  const body = await response.json();

  expect(body.data).toBeDefined();
  expect(body.data.email).toBe(userData.email);
  expect(body.data.firstName).toBe(userData.firstName);
  expect(body.data.lastName).toBe(userData.lastName);
  expect(body.data.role).toBe(userData.role);
});

test("PUT users - should update a user", async ({ usersApi }) => {
  // I initially planned to create a new user and use its ID for the update request.
  // However, this test API does not persist newly created users, 
  // so the created user cannot be found in the subsequent update request.
  // Therefore, we use an existing user ID (ID: 1) for the PUT request.

  // Create a user
  //   const createUserData = {
  //     email: `test-${Date.now()}@example.com`,
  //     firstName: "Van A",
  //     lastName: "Nguyen",
  //     role: "user",
  //   };

  //   const createResponse = await usersApi.createUser(createUserData);

  //   expect(createResponse.status()).toBe(201);
  //   await expect(createResponse).toBeOK();

  //   const createBody = await createResponse.json();
  //   const userId = createBody.data.id;

  // Update the created user
  const updateUserData = {
    email: `updated-${Date.now()}@example.com`,
    firstName: "Updated",
    lastName: "Updated",
    role: "admin",
  };

  const updateResponse = await usersApi.updateUser(userId, updateUserData);

  expect(updateResponse.status()).toBe(200);
  await expect(updateResponse).toBeOK();

  const updateBody = await updateResponse.json();

  expect(updateBody.data).toBeDefined();
  expect(updateBody.data.id).toBe(userId);
  expect(updateBody.data.email).toBe(updateUserData.email);
  expect(updateBody.data.firstName).toBe(updateUserData.firstName);
  expect(updateBody.data.lastName).toBe(updateUserData.lastName);
  expect(updateBody.data.role).toBe(updateUserData.role);
});

test("PATCH users - should partially update a user", async ({ usersApi }) => {
  const patchData = {
    firstName: "Van B",
  };

  const response = await usersApi.patchUser(userId, patchData);

  expect(response.status()).toBe(200);
  await expect(response).toBeOK();

  const body = await response.json();

  expect(body.data).toBeDefined();
  expect(body.data.id).toBe(userId);
  expect(body.data.firstName).toBe(patchData.firstName);
});

test("DELETE users - should delete a user", async ({ usersApi }) => {
  // Ideally, I should create a user and use its ID for the delete request. 
  // However, this test API does not persist newly created users, 
  // so I cannot verify the user after deletion. 
  // Therefore, I use a non-existing user ID to verify that the GET request returns 404.

  const ivalidUserId = 104;

  const deleteResponse = await usersApi.deleteUser(userId);

  expect(deleteResponse.status()).toBe(204);

  const getResponse = await usersApi.getSpecificUser(ivalidUserId);

  expect(getResponse.status()).toBe(404);
});
