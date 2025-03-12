import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { GetLongestOnDietSequenceUseCase } from "../meals/get-longest-on-diet-sequence";

export function makeGetLongestOnDietSequenceUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const getLongestOnDietSequenceUseCase = new GetLongestOnDietSequenceUseCase(
    mealsRepository
  );

  return getLongestOnDietSequenceUseCase;
}
