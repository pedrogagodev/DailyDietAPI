import { makeGetMealsOffDietNumberUseCase } from "@/use-cases/factories/make-get-meals-off-diet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getMealsOffDietNumber(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getMealsOffDietNumberSchema = z.object({
    userId: z.string().min(1, { message: "Please, provide a user id" }),
  });

  const { userId } = getMealsOffDietNumberSchema.parse(request.params);
  try {
    const getMealsOffDietNumberUseCase = makeGetMealsOffDietNumberUseCase();

    const totalMealsOffDietNumber = await getMealsOffDietNumberUseCase.execute({
      userId,
    });

    return reply.status(200).send({ data: totalMealsOffDietNumber });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }
}
