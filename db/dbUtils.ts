import { Pool, QueryResultRow } from "pg";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: Date;
};

export type CreateUserData = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await pool.query<T>(text, params);

  return result.rows;
}

export async function createUser(userData: CreateUserData): Promise<User> {
  const users = await query<User>(
    `
      INSERT INTO users (
        email,
        first_name,
        last_name,
        role
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [userData.email, userData.firstName, userData.lastName, userData.role],
  );

  return users[0];
}

export async function findUserByEmail(
  email: string,
): Promise<User | undefined> {
  const users = await query<User>(
    `
      SELECT *
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  return users[0];
}

export async function deleteUserByEmail(email: string): Promise<void> {
  await query(
    `
      DELETE FROM users
      WHERE email = $1
    `,
    [email],
  );
}

export async function closeDbConnection() {
  await pool.end();
}
