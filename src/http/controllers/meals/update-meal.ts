import { makeUpdateMealUseCase } from "@/use-cases/factories/make-update-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

interface UpdateMealBody {
  name?: string;
  description?: string | null;
isOnDiet?: boolean;
}

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, isOnDiet } = request.body as UpdateMealBody;
  const { id } = request.query as { id: string };
  try {
    const updateMealUseCase = makeUpdateMealUseCase();

    const { meal } = await updateMealUseCase.execute({
      id,
      data: {
        name,
        description,
        isOnDiet,
      },
    });

    return reply.status(200).send({ data: meal });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }
}
