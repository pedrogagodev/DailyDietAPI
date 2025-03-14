import { makeUpdateMealUseCase } from "@/use-cases/factories/make-update-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface UpdateMealBody {
  name?: string;
  description?: string | null;
  isOnDiet?: boolean;
}

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const updateMealBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isOnDiet: z.boolean().optional(),
  });

  const updateMealQuerySchema = z.object({
    mealId: z.string().min(1, { message: "Please, provide a meal id" }),
  });

  const { mealId } = updateMealQuerySchema.parse(request.params);
  const { name, description, isOnDiet } = updateMealBodySchema.parse(
    request.body
  );
  try {
    const updateMealUseCase = makeUpdateMealUseCase();

    const { meal } = await updateMealUseCase.execute({
      id: mealId,
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
