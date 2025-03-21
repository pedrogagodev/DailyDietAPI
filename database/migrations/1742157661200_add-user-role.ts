import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    CREATE TYPE IF NOT EXISTS "user_role" AS ENUM ('ADMIN', 'USER');
  `);

  pgm.addColumn("users", {
    role: {
      type: "user_role",
      notNull: true,
      default: "USER",
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn("users", "role");

  pgm.sql(`
    DROP TYPE IF EXISTS "user_role";
  `);
}
