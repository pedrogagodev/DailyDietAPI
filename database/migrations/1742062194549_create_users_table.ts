import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

const shorthands: ColumnDefinitions | undefined = undefined;

export const up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.createExtension("uuid-ossp", { ifNotExists: true, schema: "public" });

  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("public.uuid_generate_v4()"),
    },
    name: { type: "varchar(255)", notNull: true },
    email: { type: "varchar(255)", notNull: true, unique: true },
    password_hash: { type: "varchar(255)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

export const down = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.dropTable("users");
  pgm.dropExtension("uuid-ossp");
};
