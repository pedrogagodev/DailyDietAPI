import { beforeEach, describe, expect, it } from "vitest";
import { UpdateMealUseCase } from "./update-meal";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { MealNotFoundError } from "@/errors/meal-not-found";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let updateMealCase: UpdateMealUseCase;
let createMealCase: CreateMealUseCase;

describe("Update Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
    updateMealCase = new UpdateMealUseCase(mealsRepository);
  });

  it("should be able to update meal", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });

    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
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
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });

    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
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

  it("should not to able to update a meal with the wrong id", async () => {
     const user = await usersRepository.create({
       name: "John Doe",
       email: "john.doe@example.com",
       password_hash: "hashed-password",
     });

      await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
      description: "A simple breakfast",
    });

    await expect(() =>
      updateMealCase.execute({
        id: "Any id",
        data: {
          name: "Updated Bread with eggs",
        },
      })
    ).rejects.instanceOf(MealNotFoundError);
  });
});
