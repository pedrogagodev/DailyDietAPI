import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { GetTotalMealsNumberUseCase } from "../meals/get-total-meals-number";

export function makeGetTotalMealsNumberUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const getTotalMealsNumberUseCase = new GetTotalMealsNumberUseCase(
    mealsRepository
  );

  return getTotalMealsNumberUseCase;
}
