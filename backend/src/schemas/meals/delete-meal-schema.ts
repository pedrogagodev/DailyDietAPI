import { z } from "zod";

export const deleteMealSchema = z.object({
  mealId: z.string().min(1, { message: "Please, provide a meal id" }),
});

export const deleteMealResponseSchema = {
  200: z.object({
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
