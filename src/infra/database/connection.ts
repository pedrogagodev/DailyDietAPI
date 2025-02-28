import { env } from "@/config/env";

import { Pool } from "pg";

export const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL: ", err);
    return;
  }
  release();
  console.log("Connect to PostgreSQL successfully");
});

type PostgresParam =
  | number
  | string
  | boolean
  | null
  | Date
  | (number | string | boolean | null)[];

export async function query(text: string, params: PostgresParam[] = []) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    if (env.NODE_ENV === "development") {
      console.log("Query executed!", { text, duration, rows: result.rowCount });
    }

    return result;
  } catch (error) {
    console.log(`Error executing query: ${error}`);
    throw error;
  }
}
