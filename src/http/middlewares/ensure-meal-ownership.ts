import type { FastifyRequest, FastifyReply } from "fastify";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { validate } from "uuid";
import { InvalidMealDataError } from "@/errors/invalid-meal-data-error";

export async function ensureMealOwnershipMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const mealsRepository = new MethodsMealsRepository();
    const { mealId } = request.params as { mealId: string };
    const userId = request.user.sub;
  
    console.log("Middleware - mealId:", mealId);
    console.log("Middleware - userId from token:", userId);
    
    if (!validate(mealId)) {
      console.log(`Invalid meal ID format: ${mealId}`);
      throw new InvalidMealDataError('Invalid meal ID format');
  }
    const meal = await mealsRepository.findById(mealId);
    console.log("Middleware - meal found:", meal);
    console.log("Middleware - meal userId:", meal?.userId);
  
    if (!meal || meal.userId !== userId) {
    console.log("Middleware - Unauthorized: meal.userId !== userId");
    throw new UnauthorizedAccessError();
  }


}
