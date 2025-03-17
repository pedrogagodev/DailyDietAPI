import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeGetLongestOnDietSequenceUseCase } from "@/use-cases/factories/make-get-longest-on-diet-sequence-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getLongestOnDietSequence(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLongestOnDietSequenceSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user id." }),
  });

  const { userId } = getLongestOnDietSequenceSchema.parse(request.params);
  const getLongestOnDietSequenceUseCase = makeGetLongestOnDietSequenceUseCase();

  const mealsSequence = await getLongestOnDietSequenceUseCase.execute({
    userId,
  });

  return reply.status(200).send({ mealsSequence: Number(mealsSequence) });
}
