import { z } from "zod";

export const editProfileBodySchema = z.object({
  name: z.string().min(1, { message: "Please, provide a name" }),
  email: z.string().email({ message: "Invalid email" }),
  currentPassword: z
    .string()
    .min(1, { message: "Please, provide the current password" }),
});

export const editProfileResponseSchema = {
  200: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  400: z.object({
    message: z.string(),
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
