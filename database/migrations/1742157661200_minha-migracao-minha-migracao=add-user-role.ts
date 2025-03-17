import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {

  pgm.createType("user_role", ["ADMIN", "USER"]);

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
  pgm.dropType("user_role");
}
