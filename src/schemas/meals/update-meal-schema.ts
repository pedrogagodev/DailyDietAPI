import { z } from "zod";

export const updateMealSchema = z.object({
  mealId: z.string().min(1, { message: "Please, provide a meal id" }),
});

export const updateMealBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isOnDiet: z.boolean().optional(),
});

export const updateMealResponseSchema = {
  200: z.object({
    meal: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      isOnDiet: z.boolean(),
      dateTime: z.date(),
      createdAt: z.date(),
      updatedAt: z.date(),
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
