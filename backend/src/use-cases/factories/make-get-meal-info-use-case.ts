import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { GetMealInfoUseCase } from "../meals/get-meal-info";

export function makeGetMealInfoUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const usersRepository = new MethodsUsersRepository();
  const getMealInfoUseCase = new GetMealInfoUseCase(
    mealsRepository,
    usersRepository
  );

  return getMealInfoUseCase;
}
