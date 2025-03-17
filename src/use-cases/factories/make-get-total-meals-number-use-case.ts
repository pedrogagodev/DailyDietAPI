import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { GetTotalMealsNumberUseCase } from "../meals/get-total-meals-number";

export function makeGetTotalMealsNumberUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const usersRepository = new MethodsUsersRepository();

  const getTotalMealsNumberUseCase = new GetTotalMealsNumberUseCase(
    mealsRepository,
    usersRepository
  );

  return getTotalMealsNumberUseCase;
}
