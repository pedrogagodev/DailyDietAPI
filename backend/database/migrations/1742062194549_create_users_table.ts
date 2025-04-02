import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

const shorthands: ColumnDefinitions | undefined = undefined;

export const up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.createExtension("uuid-ossp", { ifNotExists: true, schema: "public" });

  pgm.sql(`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid DEFAULT public.uuid_generate_v4() PRIMARY KEY,
      "name" varchar(255) NOT NULL,
      "email" varchar(255) UNIQUE NOT NULL,
      "password_hash" varchar(255) NOT NULL,
      "created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `);
};

export const down = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.dropTable("users");
  pgm.dropExtension("uuid-ossp");
};
