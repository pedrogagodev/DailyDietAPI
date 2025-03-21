import { z } from "zod";

export const getTotalMealsNumberResponseSchema = {
  200: z.object({
    mealsNumber: z.number(),
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
