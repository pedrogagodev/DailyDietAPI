import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { GetMealsOffDietNumberUseCase } from "../meals/get-meals-off-diet-number";

export function makeGetMealsOffDietNumberUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const getMealsOffDietNumberUseCase = new GetMealsOffDietNumberUseCase(
    mealsRepository
  );

  return getMealsOffDietNumberUseCase;
}
