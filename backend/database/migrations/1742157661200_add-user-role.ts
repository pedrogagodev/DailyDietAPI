import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";
export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  const typeResult = await pgm.db.query(`
    SELECT 1 FROM pg_type WHERE typname = 'user_role';
  `);

  if (!typeResult.rowCount) {
    pgm.sql(`
      CREATE TYPE "user_role" AS ENUM ('ADMIN', 'USER');
    `);
  }

  const columnResult = await pgm.db.query(`
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'role';
  `);

  if (!columnResult.rowCount) {
    pgm.addColumn("users", {
      role: {
        type: "user_role",
        notNull: true,
        default: "USER",
      },
    });
  }
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  const columnResult = await pgm.db.query(`
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'role';
  `);

  if (columnResult.rowCount && columnResult.rowCount > 0) {
    pgm.dropColumn("users", "role");
  }

  const typeResult = await pgm.db.query(`
    SELECT 1 FROM pg_type WHERE typname = 'user_role';
  `);

  if (typeResult.rowCount && typeResult.rowCount > 0) {
    pgm.sql(`
      DROP TYPE IF EXISTS "user_role";
    `);
  }
}
