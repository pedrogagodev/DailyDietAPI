import { makeGetMealsOffDietNumberUseCase } from "@/use-cases/factories/make-get-meals-off-diet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getMealsOffDietNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub;
  const getMealsOffDietNumberUseCase = makeGetMealsOffDietNumberUseCase();

  const mealsNumber = await getMealsOffDietNumberUseCase.execute({
    userId,
    requestingUserId: userId,
  });

  return reply.status(200).send({ mealsNumber });
}
