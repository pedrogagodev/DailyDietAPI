import { z } from "zod";

export const createMealBodySchema = z.object({
  name: z.string().min(1, { message: "Please, provide a meal name" }),
  description: z.string().nullable(),
  isOnDiet: z.boolean({
    message: "Please, provide a valid value for isOnDiet",
  }),
});

export const createMealResponseSchema = {
  201: z.object({
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
