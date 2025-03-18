import { beforeEach, describe, expect, it } from "vitest";
import { UpdateMealUseCase } from "./update-meal";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { MealNotFoundError } from "@/errors/meal-not-found";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";

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
      requestingUserId: user.id,
    });

    const response = await updateMealCase.execute({
      id: createdMeal.meal.id,
      data: {
        name: "Lunch",
        description: "Rice and chicken",
        isOnDiet: false,
      },
      requestingUserId: user.id,
    });

    expect(response.updatedMeal.name).toBe("Lunch");
    expect(response.updatedMeal.description).toBe("Rice and chicken");
    expect(response.updatedMeal.isOnDiet).toBe(false);
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
      requestingUserId: user.id,
    });

    const response = await updateMealCase.execute({
      id: createdMeal.meal.id,
      data: {
        name: "Updated Bread with eggs",
      },
      requestingUserId: user.id,
    });

    expect(response.updatedMeal.name).toEqual("Updated Bread with eggs");
    expect(response.updatedMeal.description).toEqual("A simple breakfast");
    expect(response.updatedMeal.isOnDiet).toBe(true);
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
      requestingUserId: user.id,
    });

    await expect(() =>
      updateMealCase.execute({
        id: "Any id",
        data: {
          name: "Updated Bread with eggs",
        },
        requestingUserId: user.id,
      })
    ).rejects.instanceOf(MealNotFoundError);
  });

  it("should not be able to update a meal with another user's id", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });

    const anotherUser = await usersRepository.create({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password_hash: "hashed-password",
    });

    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
      description: "A simple breakfast",
      requestingUserId: user.id,
    });

    await expect(
      updateMealCase.execute({
        id: createdMeal.meal.id,
        data: {
          name: "Updated Bread with eggs",
        },
        requestingUserId: anotherUser.id,
      })
    ).rejects.instanceOf(UnauthorizedAccessError);
  });
});
