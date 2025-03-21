import { z } from "zod";

export const getMealsOffDietNumberResponseSchema = {
  200: z.object({
    mealsOffDietNumber: z.number(),
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
