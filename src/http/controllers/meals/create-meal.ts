import { makeCreateMealUseCase } from "@/use-cases/factories/make-create-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

interface CreateMealRequest {
  userId: string;
  name: string;
  description?: string | null;
  isOnDiet: boolean;
}

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const { userId, name, description, isOnDiet } =
    request.body as CreateMealRequest;
  try {
    const createMealUseCase = makeCreateMealUseCase();

    await createMealUseCase.execute({ userId, name, description, isOnDiet });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }

  return reply.status(201).send();
}
