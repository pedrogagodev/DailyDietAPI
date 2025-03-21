import { z } from "zod";

export const getMealsOnDietNumberResponseSchema = {
  200: z.object({
    mealsOnDietNumber: z.number(),
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
