import { test as base } from "@playwright/test";
import { createUser, findUserByEmail, deleteUserByEmail } from "../db/dbUtils";

type DbFixturesUser = {
  db: {
    createUser: typeof createUser;
    findUserByEmail: typeof findUserByEmail;
  };
};

export const test = base.extend<DbFixturesUser>({
  db: async ({}, use) => {
    const createdEmails: string[] = [];

    await use({
      createUser: async (userData) => {
        const user = await createUser(userData);

        createdEmails.push(user.email);

        return user;
      },

      findUserByEmail,
    });

    // Cleanup after the test, even if the test fails
    for (const email of createdEmails) {
      await deleteUserByEmail(email);
    }
  },
});
