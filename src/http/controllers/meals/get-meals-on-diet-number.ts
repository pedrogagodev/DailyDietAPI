import { makeGetMealsOnDietNumberUseCase } from "@/use-cases/factories/make-get-meals-on-diet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getMealsOnDietNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getMealsOnDietNumberSchema = z.object({
    userId: z.string().min(1, { message: "Please, provide a user id" }),
  });

  const { userId } = getMealsOnDietNumberSchema.parse(request.params);
  try {
    const getMealsOnDietNumberUseCase = makeGetMealsOnDietNumberUseCase();

    const totalMealsOnDietNumber = await getMealsOnDietNumberUseCase.execute({
      userId,
    });

    return reply.status(200).send({ data: totalMealsOnDietNumber });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }
}
