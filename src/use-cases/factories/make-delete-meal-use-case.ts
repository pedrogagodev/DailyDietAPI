import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { DeleteMealUseCase } from "../meals/delete-meal";

export function makeDeleteMealUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const deleteMealUseCase = new DeleteMealUseCase(mealsRepository);

  return deleteMealUseCase;
}
