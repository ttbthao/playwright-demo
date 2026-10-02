import { APIRequestContext } from "@playwright/test";

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(email: string, password: string) {
    return this.request.post("/v1/auth/login", {
      data: {
        email,
        password,
      },
    });
  }
}
