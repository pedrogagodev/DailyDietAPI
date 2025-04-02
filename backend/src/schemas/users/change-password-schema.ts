import { z } from "zod";

export const changePasswordBodySchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Please, provide the current password" }),
  newPassword: z
    .string()
    .min(1, { message: "Please, provide the new password" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Please, provide the confirm password" }),
});

export const changePasswordResponseSchema = {
  200: z.object({
    message: z.string(),
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
