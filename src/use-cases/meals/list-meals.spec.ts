import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { ListMealsUseCase } from "./list-meals";

let mealsRepository: InMemoryMealsRepository;
let createMealCase: CreateMealUseCase;
let listMealsCase: ListMealsUseCase;

describe("List Meals Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
    listMealsCase = new ListMealsUseCase(mealsRepository);
  });

  it("should be able to list meals", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await expect(
      listMealsCase.execute({
        userId: createdMeal.meal.userId,
      })
    ).resolves.not.toThrow();
  });
});
