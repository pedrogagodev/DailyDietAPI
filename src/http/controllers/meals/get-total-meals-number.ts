import { makeGetTotalMealsNumberUseCase } from "@/use-cases/factories/make-get-total-meals-number-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getTotalMealsNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getTotalMealsNumberSchema = z.object({
    userId: z.string().min(1, { message: "Please, provide a user id" }),
  });

  const { userId } = getTotalMealsNumberSchema.parse(request.params);
  try {
    const getTotalMealsNumberUseCase = makeGetTotalMealsNumberUseCase();

    const totalMealsNumber = await getTotalMealsNumberUseCase.execute({
      userId,
    });

    return reply.status(200).send({ data: totalMealsNumber });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }
}
