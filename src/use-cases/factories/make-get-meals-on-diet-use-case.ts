import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { GetMealsOnDietNumberUseCase } from "../meals/get-meals-on-diet-number";

export function makeGetMealsOnDietNumberUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const getMealsOnDietNumberUseCase = new GetMealsOnDietNumberUseCase(
    mealsRepository
  );

  return getMealsOnDietNumberUseCase;
}
