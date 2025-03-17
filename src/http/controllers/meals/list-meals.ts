import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeListMealsUseCase } from "@/use-cases/factories/make-list-meals-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listMeals(request: FastifyRequest, reply: FastifyReply) {
  const listMealsSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user id." }),
  });

  const { userId } = listMealsSchema.parse(request.params);
  const listMealsUseCase = makeListMealsUseCase();

  const meals = await listMealsUseCase.execute({ userId });

  return reply.status(200).send({ data: meals });
}
