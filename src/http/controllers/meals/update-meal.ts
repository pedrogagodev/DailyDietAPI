import { makeUpdateMealUseCase } from "@/use-cases/factories/make-update-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

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
  const updateMealUseCase = makeUpdateMealUseCase();

  const { updatedMeal } = await updateMealUseCase.execute({
    id: mealId,
    data: {
      name,
      description,
      isOnDiet,
    },
    requestingUserId: request.user.sub,
  });

  return reply.status(200).send({ data: updatedMeal });
}
