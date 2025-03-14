import { makeDeleteMealUseCase } from "@/use-cases/factories/make-delete-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealSchema = z.object({
    mealId: z.string().min(1, { message: "Please, provide a meal id" }),
  });
  const { mealId } = deleteMealSchema.parse(request.params);
  try {
    const deleteMealUseCase = makeDeleteMealUseCase();
    await deleteMealUseCase.execute({ id: mealId });

    return reply.status(200).send({ message: "Meal deleted successfully" });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }
}
