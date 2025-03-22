import { InvalidMealDataError } from "@/errors/invalid-meal-data-error";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import type { FastifyReply, FastifyRequest } from "fastify";
import { validate } from "uuid";

export async function ensureMealOwnershipMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealsRepository = new MethodsMealsRepository();
  const { mealId } = request.params as { mealId: string };
  const userId = request.user.sub;

  if (!validate(mealId)) {
    throw new InvalidMealDataError("Invalid meal ID format");
  }
  const meal = await mealsRepository.findById(mealId);

  if (!meal || meal.userId !== userId) {
    throw new UnauthorizedAccessError();
  }
}
