import { z } from "zod";

export const registerBodySchema = z.object({
  name: z.string().min(1, { message: "Please, provide a name" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    }),
});

export const registerResponseSchema = {
  201: z.object({
    id: z.string(),
  }),
  400: z.object({
    message: z.string(),
  }),
  409: z.object({
    message: z.string(),
  }),
  500: z.object({
    message: z.string(),
  }),
};
