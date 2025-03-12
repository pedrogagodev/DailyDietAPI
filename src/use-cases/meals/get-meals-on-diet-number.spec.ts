import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { getTotalMealsNumberUseCase } from "./get-total-meals-number";
import { getMealsOnDietNumberUseCase } from "./get-meals-on-diet-number";

let mealsRepository: InMemoryMealsRepository;
let createMealCase: CreateMealUseCase;
let getMealsOnDietNumberCase: getMealsOnDietNumberUseCase;

describe("Get Total Meals On Diet Number Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
    getMealsOnDietNumberCase = new getMealsOnDietNumberUseCase(mealsRepository);
  });

  it("should be able to get total meals on diet number", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    const totalMealsNumber = await getMealsOnDietNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsNumber).toBe(1);
  });

  it("should be able to get total meals on diet number", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
        name: "Bread with eggs2",
        isOnDiet: false,
        userId: "user-1",
        description: "A simple breakfast",
      });

      await createMealCase.execute({
        name: "Bread with eggs3",
        isOnDiet: true,
        userId: "user-1",
        description: "A simple breakfast",
      });

      await createMealCase.execute({
        name: "Bread with eggs",
        isOnDiet: true,
        userId: "user-1",
        description: "A simple breakfast",
      });

    const totalMealsNumber = await getMealsOnDietNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsNumber).toBe(3);
  });
});
