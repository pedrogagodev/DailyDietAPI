import { z } from "zod";

export const getLongestOnDietSequenceResponseSchema = {
  200: z.object({
    longestOnDietSequence: z.number(),
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
