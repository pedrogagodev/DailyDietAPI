import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config();
}

const envSchema = z.object({
  DB_USER: z.string().min(1, { message: "DB_USER is required" }),
  DB_PASSWORD: z.string().min(1, { message: "DB_PASSWORD is required" }),
  DB_NAME: z.string().min(1, { message: "DB_NAME is required" }),
  DB_PORT: z.coerce.number().default(5432),
  DB_HOST: z.string().min(1, { message: "DB_HOST is required" }),

  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  PORT: z.coerce.number().default(3333),

  JWT_SECRET: z.string().min(1, { message: "JWT_SECRET is required" }),
  DATABASE_URL: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ Invalid environment variables!", _env.error.format());

  throw new Error("invalid environment variables.");
}

export const env = _env.data;
