import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { GetLongestOnDietSequenceUseCase } from "../meals/get-longest-on-diet-sequence";

export function makeGetLongestOnDietSequenceUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const usersRepository = new MethodsUsersRepository();

  const getLongestOnDietSequenceUseCase = new GetLongestOnDietSequenceUseCase(
    mealsRepository,
    usersRepository
  );

  return getLongestOnDietSequenceUseCase;
}
