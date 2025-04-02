import { makeGetMealsOnDietNumberUseCase } from "@/use-cases/factories/make-get-meals-on-diet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getMealsOnDietNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub;
  const getMealsOnDietNumberUseCase = makeGetMealsOnDietNumberUseCase();

  const mealsNumber = await getMealsOnDietNumberUseCase.execute({
    userId,
    requestingUserId: userId,
  });

  return reply.status(200).send({ mealsOnDietNumber: mealsNumber });
}
