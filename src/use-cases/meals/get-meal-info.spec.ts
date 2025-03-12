import { MealNotFoundError } from "@/errors/meal-not-found";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetMealInfoUseCase } from "./get-meal-info";

let mealsRepository: InMemoryMealsRepository;
let createMealCase: CreateMealUseCase;
let getMealInfoCase: GetMealInfoUseCase;

describe("Get Meal Info Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
    getMealInfoCase = new GetMealInfoUseCase(mealsRepository);
  });

  it("should be able to get a meal info", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
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
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await expect(
      getMealInfoCase.execute({
        userId: "Any user id",
        id: createdMeal.meal.id,
      })
    ).rejects.instanceOf(MealNotFoundError);
  });

  it("should not to be able to get a meal info with wrong Id", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
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
