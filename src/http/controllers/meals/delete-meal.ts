import { makeDeleteMealUseCase } from "@/use-cases/factories/make-delete-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealSchema = z.object({
    mealId: z.string().uuid({ message: "Invalid meal id." }),
  });

  const { mealId } = deleteMealSchema.parse(request.params);
  const userId = request.user.sub;
  const deleteMealUseCase = makeDeleteMealUseCase();
  await deleteMealUseCase.execute({ id: mealId, requestingUserId: userId });

  return reply.status(200).send({ message: "Meal deleted successfully" });
}
