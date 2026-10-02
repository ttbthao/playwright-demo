import { test, expect } from "../../fixtures/api.fixture";
import { AuthApi } from "../../api/clients/AuthApi";

test("Login API - valid credentials", async ({ apiRequest }) => {
  const authApi = new AuthApi(apiRequest);

  const response = await authApi.login(
    process.env.API_EMAIL!,
    process.env.API_PASSWORD!,
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data.tokenType).toBe("Bearer");
  expect(body.data.accessToken).toBeTruthy();
  expect(body.data.refreshToken).toBeTruthy();
});
