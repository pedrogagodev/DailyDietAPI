import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetTotalMealsNumberUseCase } from "./get-total-meals-number";

let mealsRepository: InMemoryMealsRepository;
let createMealCase: CreateMealUseCase;
let getTotalMealsNumberCase: GetTotalMealsNumberUseCase;

describe("Get Total Meals Number Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
    getTotalMealsNumberCase = new GetTotalMealsNumberUseCase(mealsRepository);
  });

  it("should be able to get total meals number", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    const totalMealsNumber = await getTotalMealsNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsNumber).toBe(1);
  });
});
