import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  const result = await pgm.db.query(`
    SELECT 1 FROM pg_type WHERE typname = 'user_role';
  `);

  if (result.rowCount === 0) {
    pgm.sql(`
      CREATE TYPE "user_role" AS ENUM ('ADMIN', 'USER');
    `);
  }

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
  const result = await pgm.db.query(`
    SELECT 1 FROM pg_type WHERE typname = 'user_role';
  `);

  if (result.rowCount === 1) {
    pgm.sql(`
      DROP TYPE "user_role";
    `);
  }
}
