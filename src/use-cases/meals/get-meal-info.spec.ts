import { MealNotFoundError } from "@/errors/meal-not-found";
import { UserNotFoundError } from "@/errors/user-not-found";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetMealInfoUseCase } from "./get-meal-info";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealCase: CreateMealUseCase;
let getMealInfoCase: GetMealInfoUseCase;

describe("Get Meal Info Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
    getMealInfoCase = new GetMealInfoUseCase(mealsRepository, usersRepository);
  });

  it("should be able to get a meal info", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });

    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
      description: "A simple breakfast",
    });

    await expect(
      getMealInfoCase.execute({
        userId: createdMeal.meal.userId,
        id: createdMeal.meal.id,
      })
    ).resolves.not.toThrow();
  });

  it("should not to be able to get a meal info with wrong UserId", async () => {
    const wrongUser = await usersRepository.create({
      name: "Wrong User",
      email: "wrong@example.com",
      password_hash: "hashed-password",
    });

    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: wrongUser.id,
      description: "A simple breakfast",
    });

    await expect(
      getMealInfoCase.execute({
        userId: "Any user id",
        id: createdMeal.meal.id,
      })
    ).rejects.instanceOf(UserNotFoundError);
  });

  it("should not to be able to get a meal info with wrong Id", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });

    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
      description: "A simple breakfast",
    });

    await expect(
      getMealInfoCase.execute({
        userId: createdMeal.meal.userId,
        id: "Any id",
      })
    ).rejects.instanceOf(MealNotFoundError);
  });
});
