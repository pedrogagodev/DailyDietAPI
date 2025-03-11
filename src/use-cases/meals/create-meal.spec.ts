import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";

let mealsRepository: InMemoryMealsRepository;
let createMealCase: CreateMealUseCase;

describe("Create Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
  });

  it("should be able to create meal", async () => {
    const { meal } = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    expect(meal.id).toEqual(expect.any(String));
  });
});
