import { test as base, expect, APIRequestContext } from "@playwright/test";

import { AuthApi } from "../api/clients/AuthApi";
import { UsersApi } from "../api/clients/UsersApi";

type ApiFixtures = {
  apiRequest: APIRequestContext;
  accessToken: string;
  usersApi: UsersApi;
};

export const test = base.extend<ApiFixtures>({
  apiRequest: async ({ playwright }, use) => {
    const apiRequest = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL,
    });

    await use(apiRequest);

    await apiRequest.dispose();
  },

  accessToken: async ({ apiRequest }, use) => {
    const authApi = new AuthApi(apiRequest);

    const response = await authApi.login(
      process.env.API_EMAIL!,
      process.env.API_PASSWORD!,
    );

    await expect(response).toBeOK();

    const body = await response.json();
    const accessToken = body.data.accessToken;

    await use(accessToken);
  },

  usersApi: async ({ apiRequest, accessToken }, use) => {
    const usersApi = new UsersApi(apiRequest, accessToken);

    await use(usersApi);
  },
});

export { expect };
