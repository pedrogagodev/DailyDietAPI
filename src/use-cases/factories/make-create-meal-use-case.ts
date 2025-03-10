import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { CreateMealUseCase } from "../meals/create-meal";

export function makeCreateMealUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const createMealUseCase = new CreateMealUseCase(mealsRepository);

  return createMealUseCase;
}
