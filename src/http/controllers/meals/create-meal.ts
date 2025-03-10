import { makeCreateMealUseCase } from "@/use-cases/factories/make-create-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface CreateMealRequest {
  userId: string;
  name: string;
  description?: string | null;
  isOnDiet: boolean;
}

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const createMealSchema = z.object({
    name: z.string().min(1, { message: "Please, provide a meal name" }),
    userId: z.string().min(1, { message: "Please, provide a user id" }),
    description: z.string().nullable(),
    isOnDiet: z.boolean({
      message: "Please, provide a valid value for isOnDiet",
    }),
  });

  const { name, userId, description, isOnDiet } = createMealSchema.parse(
    request.body
  );
  try {
    const createMealUseCase = makeCreateMealUseCase();

    await createMealUseCase.execute({ userId, name, description, isOnDiet });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }

  return reply.status(201).send();
}
