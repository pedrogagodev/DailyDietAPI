import { makeCreateMealUseCase } from "@/use-cases/factories/make-create-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const createMealSchema = z.object({
    name: z.string().min(1, { message: "Please, provide a meal name" }),
    description: z.string().nullable(),
    isOnDiet: z.boolean({
      message: "Please, provide a valid value for isOnDiet",
    }),
  });

  const { name, description, isOnDiet } = createMealSchema.parse(
    request.body
  );
  const userId = request.user.sub;

  const createMealUseCase = makeCreateMealUseCase();

  const data = await createMealUseCase.execute({
    userId,
    name,
    description,
    isOnDiet,
    requestingUserId: userId,
  });

  return reply.status(201).send({ data });
}
