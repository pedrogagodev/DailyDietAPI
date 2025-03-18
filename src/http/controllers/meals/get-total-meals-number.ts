import { makeGetTotalMealsNumberUseCase } from "@/use-cases/factories/make-get-total-meals-number-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
export async function getTotalMealsNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const userId = request.user.sub;
  const getTotalMealsNumberUseCase = makeGetTotalMealsNumberUseCase();

  const mealsNumber = await getTotalMealsNumberUseCase.execute({
    userId,
    requestingUserId: userId,
  });

  return reply.status(200).send({ mealsNumber });
}
