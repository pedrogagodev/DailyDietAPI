import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserNotFoundError } from "@/errors/user-not-found";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealCase: CreateMealUseCase;

describe("Create Meal Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
  });

  it("should be able to create meal", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });

      const { meal } = await createMealCase.execute({
        name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
      description: "A simple breakfast",
    });

    expect(meal.id).toEqual(expect.any(String));
  });

  it("should not be able to create meal with wrong user id", async () => {
      await usersRepository.create({
      name: "Wrong User",
      email: "wrong@example.com",
      password_hash: "hashed-password",
    });

    await expect(
      createMealCase.execute({
        name: "Bread with eggs",
        isOnDiet: true,
        userId: "wrong-user-id",
        description: "A simple breakfast",
      })
    ).rejects.instanceOf(UserNotFoundError);
  });
});
