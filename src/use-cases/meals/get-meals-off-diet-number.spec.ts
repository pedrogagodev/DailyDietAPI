import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { getMealsOffDietNumberUseCase } from "./get-meals-off-diet-number";

let mealsRepository: InMemoryMealsRepository;
let createMealCase: CreateMealUseCase;
let getMealsOffDietNumberCase: getMealsOffDietNumberUseCase;

describe("Get Total Meals Off Diet Number Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
    getMealsOffDietNumberCase = new getMealsOffDietNumberUseCase(
      mealsRepository
    );
  });

  it("should be able to get total meals off diet number", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    const totalMealsOffDietNumber = await getMealsOffDietNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsOffDietNumber).toBe(0);
  });

  it("should be able to get total meals off diet number", async () => {
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

    const totalMealsOffDietNumber = await getMealsOffDietNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsOffDietNumber).toBe(1);
  });
});
