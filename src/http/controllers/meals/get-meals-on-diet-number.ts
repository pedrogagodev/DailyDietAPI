import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeGetMealsOnDietNumberUseCase } from "@/use-cases/factories/make-get-meals-on-diet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getMealsOnDietNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getMealsOnDietNumberSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user id." }),
  });

  const { userId } = getMealsOnDietNumberSchema.parse(request.params);
  const getMealsOnDietNumberUseCase = makeGetMealsOnDietNumberUseCase();

  const mealsNumber = await getMealsOnDietNumberUseCase.execute({ userId });

  return reply.status(200).send({ mealsNumber });
}
