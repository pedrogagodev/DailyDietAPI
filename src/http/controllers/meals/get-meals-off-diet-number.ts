import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeGetMealsOffDietNumberUseCase } from "@/use-cases/factories/make-get-meals-off-diet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getMealsOffDietNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getMealsOffDietNumberSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user id." }),
  });

  const { userId } = getMealsOffDietNumberSchema.parse(request.params);
  const getMealsOffDietNumberUseCase = makeGetMealsOffDietNumberUseCase();

  const mealsNumber = await getMealsOffDietNumberUseCase.execute({
    userId,
  });

  return reply.status(200).send({ mealsNumber });
}
