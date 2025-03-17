import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { CreateMealUseCase } from "../meals/create-meal";

export function makeCreateMealUseCase() {
  const mealsRepository = new MethodsMealsRepository();
  const usersRepository = new MethodsUsersRepository();
  const createMealUseCase = new CreateMealUseCase(
    mealsRepository,
    usersRepository
  );

  return createMealUseCase;
}
