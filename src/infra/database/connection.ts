import { env } from "@/config/env";
import { DatabaseConnectionError } from "@/errors/database-connection-error";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
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
  const client = await pool.connect();
  try {
    const url = new URL(process.env.DATABASE_URL as string);
    const schema = url.searchParams.get("schema") || "public";
    await client.query(`SET search_path TO "${schema}"`);

    const result = await client.query(text, params);
    const duration = Date.now() - start;

    if (env.NODE_ENV === "development") {
      console.log("Query executed!", { text, duration, rows: result.rowCount });
    }
    return result;
  } catch (error) {
    console.error(`Error executing query: ${error}`);
    throw new DatabaseConnectionError(
      `Database error: ${(error as Error).message}`
    );
  } finally {
    client.release();
  }
}

pool.on("connect", async client => {
  const url = new URL(process.env.DATABASE_URL as string);
  const schema = url.searchParams.get("schema") || "public";
  await client.query(`SET search_path TO "${schema}"`);
  console.log("Connected to PostgreSQL with schema:", schema);
});
