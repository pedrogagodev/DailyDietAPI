import { MealNotFoundError } from "@/errors/meal-not-found";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { DeleteMealUseCase } from "./delete-meal";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealCase: CreateMealUseCase;
let deleteMealCase: DeleteMealUseCase;

describe("Delete Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
    deleteMealCase = new DeleteMealUseCase(mealsRepository);
  });

  it("should be able to delete meal", async () => {
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

    await expect(
      deleteMealCase.execute({
        id: createdMeal.meal.id,
      })
    ).resolves.not.toThrow();
  });

  it("should not to able to delete a meal with the wrong id", async () => {
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
      deleteMealCase.execute({
        id: "Any id",
      })
    ).rejects.instanceOf(MealNotFoundError);
  });
});
