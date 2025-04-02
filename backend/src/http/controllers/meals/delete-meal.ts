import { makeDeleteMealUseCase } from "@/use-cases/factories/make-delete-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

type DeleteMealParams = {
  mealId: string;
};

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const { mealId } = request.params as DeleteMealParams;
  const userId = request.user.sub;
  const deleteMealUseCase = makeDeleteMealUseCase();
  await deleteMealUseCase.execute({ id: mealId, requestingUserId: userId });

  return reply.status(200).send({ message: "Meal deleted successfully" });
}
