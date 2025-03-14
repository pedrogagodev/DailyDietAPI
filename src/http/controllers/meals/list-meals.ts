import { makeListMealsUseCase } from "@/use-cases/factories/make-list-meals-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listMeals(request: FastifyRequest, reply: FastifyReply) {
  const listMealsSchema = z.object({
    userId: z.string().min(1, { message: "Please, provide a user id" }),
  });

  const { userId } = listMealsSchema.parse(request.query);
  try {
    const listMealsUseCase = makeListMealsUseCase();

    const meals = await listMealsUseCase.execute({ userId });

    return reply.status(200).send({ data: meals });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }
}
