import { beforeEach, describe, expect, it } from "vitest";
import { UpdateMealUseCase } from "./update-meal";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";

let mealsRepository: InMemoryMealsRepository;
let updateMealCase: UpdateMealUseCase;
let createMealCase: CreateMealUseCase;

describe("Update Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    createMealCase = new CreateMealUseCase(mealsRepository);
    updateMealCase = new UpdateMealUseCase(mealsRepository);
  });

  it("should be able to update meal", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    const response = await updateMealCase.execute({
      id: createdMeal.meal.id,
      data: {
        name: "Lunch",
        description: "Rice and chicken",
        isOnDiet: false,
      },
    });

    expect(response.meal.name).toBe("Lunch");
    expect(response.meal.description).toBe("Rice and chicken");
    expect(response.meal.isOnDiet).toBe(false);
  });

  it("should update only the provided fields", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });
  
    const response = await updateMealCase.execute({
      id: createdMeal.meal.id,
      data: {
        name: "Updated Bread with eggs",
      },
    });
  
    expect(response.meal.name).toEqual("Updated Bread with eggs");
    expect(response.meal.description).toEqual("A simple breakfast");
    expect(response.meal.isOnDiet).toBe(true);
  });
  
});
