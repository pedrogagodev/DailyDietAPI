import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeGetTotalMealsNumberUseCase } from "@/use-cases/factories/make-get-total-meals-number-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getTotalMealsNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getTotalMealsNumberSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user id." }),
  });

  const { userId } = getTotalMealsNumberSchema.parse(request.params);
  const getTotalMealsNumberUseCase = makeGetTotalMealsNumberUseCase();

  const mealsNumber = await getTotalMealsNumberUseCase.execute({
    userId,
  });

  return reply.status(200).send({ mealsNumber });
}
