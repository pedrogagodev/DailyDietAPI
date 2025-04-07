import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.renameColumn("meals", "date_time", "meal_time");
  pgm.alterColumn("meals", "meal_time", {
    type: "time",
    notNull: true,
    default: "'00:00:00'",
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.renameColumn("meals", "meal_time", "date_time");
}
