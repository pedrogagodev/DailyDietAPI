import { makeGetLongestOnDietSequenceUseCase } from "@/use-cases/factories/make-get-longest-on-diet-sequence-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getLongestOnDietSequence(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLongestOnDietSequenceSchema = z.object({
    userId: z.string().min(1, { message: "Please, provide a user id" }),
  });

  const { userId } = getLongestOnDietSequenceSchema.parse(request.params);
  try {
    const getLongestOnDietSequenceUseCase =
      makeGetLongestOnDietSequenceUseCase();

    const longestOnDietSequence = await getLongestOnDietSequenceUseCase.execute({
      userId,
    });

    return reply.status(200).send({ data: longestOnDietSequence });
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
    throw error;
  }
}
