import { z } from "zod";

export const getProfileResponseSchema = {
  200: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      role: z.enum(["ADMIN", "USER"]),
      created_at: z.date(),
      updated_at: z.date(),
    }),
  }),
  401: z.object({
    message: z.string(),
  }),
  404: z.object({
    message: z.string(),
  }),
  500: z.object({
    message: z.string(),
  }),
};
