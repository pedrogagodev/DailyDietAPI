import { describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";

describe("Create Meal Use Case", () => {
  it("should be able to create meal", async () => {
    const mealsRepository = new InMemoryMealsRepository();
    const createMealCase = new CreateMealUseCase(mealsRepository);

    const { meal } = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    expect(meal.id).toEqual(expect.any(String));
  });
});
