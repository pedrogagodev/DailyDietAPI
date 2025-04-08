import { makeListMealsUseCase } from "@/use-cases/factories/make-list-meals-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function listMeals(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const { pageParam = 1, perPage = 20 } = request.query as {
    pageParam?: string | number;
    perPage?: string | number;
  };

  const page = Number.parseInt(String(pageParam), 10) || 1;
  const limit = Number.parseInt(String(perPage), 10) || 20;

  const listMealsUseCase = makeListMealsUseCase();

  const meals = await listMealsUseCase.execute({
    userId: userId,
    requestingUserId: userId,
    page,
    limit,
  });

  return reply.status(200).send(meals);
}
