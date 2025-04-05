import { makeGetLongestOnDietSequenceUseCase } from "@/use-cases/factories/make-get-longest-on-diet-sequence-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getLongestOnDietSequence(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub;
  const getLongestOnDietSequenceUseCase = makeGetLongestOnDietSequenceUseCase();

  const mealsSequence = await getLongestOnDietSequenceUseCase.execute({
    userId,
    requestingUserId: userId,
  });

  return reply.status(200).send({
    longestOnDietSequence: Number(mealsSequence),
  });
}
