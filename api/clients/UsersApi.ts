import { APIRequestContext } from "@playwright/test";

type UserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export class UsersApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly accessToken: string,
  ) {}

  async getUsers() {
    return this.request.get("v1/users", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async getSpecificUser(userId: number) {
    return this.request.get(`v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async createUser(data: UserRequest) {
    return this.request.post("v1/users", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      data,
    });
  }

  async updateUser(userId: number, data: UserRequest) {
    return this.request.put(`v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      data,
    });
  }

  async patchUser(userId: number, data: Partial<UserRequest>) {
    return this.request.patch(`v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      data,
    });
  }

  async deleteUser(userId: number) {
    return this.request.delete(`v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}
