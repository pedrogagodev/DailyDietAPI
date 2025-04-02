import { makeUpdateMealUseCase } from "@/use-cases/factories/make-update-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

type UpdateMealParams = {
  mealId: string;
};

type UpdateMealBody = {
  name: string;
  description: string;
  isOnDiet: boolean;
};

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const { mealId } = request.params as UpdateMealParams;
  const { name, description, isOnDiet } = request.body as UpdateMealBody;
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

  return reply
    .status(200)
    .send({ meal: { ...updatedMeal, userId: undefined } });
}
