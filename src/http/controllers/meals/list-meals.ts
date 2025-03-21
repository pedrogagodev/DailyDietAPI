import { makeListMealsUseCase } from "@/use-cases/factories/make-list-meals-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function listMeals(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const listMealsUseCase = makeListMealsUseCase();

  const response = await listMealsUseCase.execute({
    userId: userId,
    requestingUserId: userId,
  });

  return reply.status(200).send({
    meals: response.meals.map(meal => ({
      ...meal,
      userId: undefined,
    })),
  });
}
