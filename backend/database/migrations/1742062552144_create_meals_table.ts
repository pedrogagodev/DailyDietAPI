import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

const shorthands: ColumnDefinitions | undefined = undefined;

export const up = async (pgm: MigrationBuilder): Promise<void> => {
  
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS "meals" (
      "id" uuid DEFAULT public.uuid_generate_v4() PRIMARY KEY,
      "user_id" uuid NOT NULL REFERENCES "users" (id) ON DELETE CASCADE,
      "name" varchar(255) NOT NULL,
      "description" text,
      "date_time" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "is_on_diet" boolean NOT NULL,
      "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const down = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.dropTable("meals");
};
