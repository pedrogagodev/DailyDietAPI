import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { GetMealsOnDietNumberUseCase } from "../meals/get-meals-on-diet-number";

export function makeGetMealsOnDietNumberUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const usersRepository = new MethodsUsersRepository();

  const getMealsOnDietNumberUseCase = new GetMealsOnDietNumberUseCase(
    mealsRepository,
    usersRepository
  );

  return getMealsOnDietNumberUseCase;
}
