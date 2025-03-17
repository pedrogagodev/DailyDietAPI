import "dotenv/config";
import { exec } from "node:child_process";
import { randomUUID } from "node:crypto";
import { promisify } from "node:util";
import { Client } from "pg";
import type { Environment } from "vitest/environments";

const execAsync = promisify(exec);

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default {
  name: "pg",
  transformMode: "ssr",
  async setup() {
    process.env.NODE_ENV = "test";
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    process.env.DATABASE_URL = databaseURL;

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);

    try {
      const migrationTableExists = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'pgmigrations'
        );
      `);

      if (migrationTableExists.rows[0].exists) {
        const lockTableExists = await client.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'pgmigrations_lock'
          );
        `);

        if (lockTableExists.rows[0].exists) {
          await client.query("DELETE FROM public.pgmigrations_lock WHERE TRUE");
          console.log("Cleared migration locks from public schema");
        }
      }
      const currentSchemaLockTableExists = await client.query(
        `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = $1
          AND table_name = 'pgmigrations_lock'
        );
      `,
        [schema]
      );

      if (currentSchemaLockTableExists.rows[0].exists) {
        await client.query(
          `DELETE FROM "${schema}".pgmigrations_lock WHERE TRUE`
        );
        console.log(`Cleared migration locks from "${schema}" schema`);
      }
      await execAsync(
        `tsx node_modules/.bin/node-pg-migrate up --migrations-dir database/migrations --schema=${schema} --no-lock`,
        {
          env: { ...process.env, DATABASE_URL: databaseURL },
        }
      );
    } catch (error) {
      console.error("Error during migrations:", error);
      throw error;
    }

    return {
      async teardown() {
        try {
          await execAsync(
            `tsx node_modules/.bin/node-pg-migrate down --migrations-dir database/migrations --schema=${schema} --no-lock`,
            {
              env: { ...process.env, DATABASE_URL: databaseURL },
            }
          );
        } catch (error) {
          console.error("Error during migration reversal:", error);
        } finally {
          await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
          await client.end();
        }
      },
    };
  },
} as Environment;
