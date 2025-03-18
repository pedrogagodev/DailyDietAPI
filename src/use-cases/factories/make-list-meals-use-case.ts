import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { ListMealsUseCase } from "../meals/list-meals";

export function makeListMealsUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const usersRepository = new MethodsUsersRepository();
  const listMealsUseCase = new ListMealsUseCase(mealsRepository, usersRepository);

  return listMealsUseCase;
}
