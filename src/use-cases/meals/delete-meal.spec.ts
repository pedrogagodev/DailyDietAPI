import { MealNotFoundError } from "@/errors/meal-not-found";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { DeleteMealUseCase } from "./delete-meal";

let mealsRepository: InMemoryMealsRepository;
let createMealCase: CreateMealUseCase;
let deleteMealCase: DeleteMealUseCase;

describe("Delete Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
    deleteMealCase = new DeleteMealUseCase(mealsRepository);
  });

  it("should be able to delete meal", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await expect(
      deleteMealCase.execute({
        id: createdMeal.meal.id,
      })
    ).resolves.not.toThrow();
  });

  it("should not to able to delete a meal with the wrong id", async () => {
    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await expect(() =>
      deleteMealCase.execute({
        id: "Any id",
      })
    ).rejects.instanceOf(MealNotFoundError);
  });
});
