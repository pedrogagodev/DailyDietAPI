import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetLongestOnDietSequenceUseCase } from "./get-longest-on-diet-sequence";

let mealsRepository: InMemoryMealsRepository;
let createMealCase: CreateMealUseCase;
let getLongestOnDietSequenceCase: GetLongestOnDietSequenceUseCase;

describe("Get Longest Sequence On Diet Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
    getLongestOnDietSequenceCase = new GetLongestOnDietSequenceUseCase(
      mealsRepository
    );
  });

  it("should be able to get longest sequence on diet", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
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

    await createMealCase.execute({
      name: "Bread with eggs",
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

    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: false,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    const totalMealsNumber = await getLongestOnDietSequenceCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsNumber).toBe(4);
  });
});
