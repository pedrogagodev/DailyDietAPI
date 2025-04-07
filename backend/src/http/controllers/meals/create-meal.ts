import { makeCreateMealUseCase } from "@/use-cases/factories/make-create-meal-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

type CreateMealBody = {
  name: string;
  description: string | null;
  isOnDiet: boolean;
  mealTime: string;
};

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, isOnDiet, mealTime } = request.body as CreateMealBody;
  const userId = request.user.sub;

  const createMealUseCase = makeCreateMealUseCase();

  const { meal } = await createMealUseCase.execute({
    userId,
    name,
    mealTime,
    description,
    isOnDiet,
    requestingUserId: userId,
  });

  return reply.status(201).send({
    meal: {
      ...meal,
      mealTime: meal.mealTime,
      userId: undefined,
    },
  });
}
