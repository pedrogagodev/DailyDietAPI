import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { GetMealsOffDietNumberUseCase } from "../meals/get-meals-off-diet-number";

export function makeGetMealsOffDietNumberUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const usersRepository = new MethodsUsersRepository();

  const getMealsOffDietNumberUseCase = new GetMealsOffDietNumberUseCase(
    mealsRepository,
    usersRepository
  );

  return getMealsOffDietNumberUseCase;
}
