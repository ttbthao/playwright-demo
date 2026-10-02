import { APIRequestContext } from "@playwright/test";

export class UsersApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly accessToken: string,
  ) {}

  async getUsers() {
    return this.request.get("/v1/users", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}
