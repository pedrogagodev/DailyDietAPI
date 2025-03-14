import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { GetMealInfoUseCase } from "../meals/get-meal-info";

export function makeGetMealInfoUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const getMealInfoUseCase = new GetMealInfoUseCase(mealsRepository);

  return getMealInfoUseCase;
}
