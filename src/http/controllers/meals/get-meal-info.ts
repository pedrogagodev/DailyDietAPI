import { makeGetMealInfoUseCase } from "@/use-cases/factories/make-get-meal-info-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getMealInfo(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getMealInfoSchema = z.object({
    mealId: z.string().min(1, { message: "Please, provide a meal id" }),
  });
  const { mealId } = getMealInfoSchema.parse(request.params);
  const userId = request.user.sub;
  try {
    const getMealInfoUseCase = makeGetMealInfoUseCase();
    const meal = await getMealInfoUseCase.execute({ id: mealId, userId });

    return reply.status(200).send({ data: meal });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }
}
