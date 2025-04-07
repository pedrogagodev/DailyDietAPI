import { z } from "zod";

export const listMealsResponseSchema = {
  200: z.object({
    meals: z.array(
      z.object({
        id: z.string(),
        userId: z.string(),
        name: z.string(),
        description: z.string().nullable(),
        isOnDiet: z.boolean(),
        mealTime: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    ),
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
