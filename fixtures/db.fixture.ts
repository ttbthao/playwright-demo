import { test as base } from "@playwright/test";
import { createUser, findUserByEmail, deleteUserByEmail } from "../db/dbUtils";

type DbFixturesUser = {
  db: {
    createUser: typeof createUser;
    findUserByEmail: typeof findUserByEmail;
    deleteUserByEmail: typeof deleteUserByEmail;
  };
};

export const test = base.extend<DbFixturesUser>({
  db: async ({}, use) => {
    await use({
      createUser,
      findUserByEmail,
      deleteUserByEmail,
    });
  },
});
