import { makeGetMealInfoUseCase } from "@/use-cases/factories/make-get-meal-info-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getMealInfo(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getMealInfoSchema = z.object({
    mealId: z.string().uuid({ message: "Invalid meal id." }),
  });

  const { mealId } = getMealInfoSchema.parse(request.params);
  const userId = request.user.sub;

  const getMealInfoUseCase = makeGetMealInfoUseCase();
  const meal = await getMealInfoUseCase.execute({
    mealId,
    userId,
    requestingUserId: userId,
  });

  return reply.status(200).send( meal );
}
