import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetLongestOnDietSequenceUseCase } from "./get-longest-on-diet-sequence";
import { UserNotFoundError } from "@/errors/user-not-found";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealCase: CreateMealUseCase;
let getLongestOnDietSequenceCase: GetLongestOnDietSequenceUseCase;

describe("Get Longest Sequence On Diet Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
    getLongestOnDietSequenceCase = new GetLongestOnDietSequenceUseCase(
      mealsRepository,
      usersRepository
    );

    usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });
  });

  it("should be able to get longest sequence on diet", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: false,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    const totalMealsNumber = await getLongestOnDietSequenceCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsNumber).toBe(4);
  });

  it("should not be able to get longest sequence on diet with wrong user id", async () => {
    await expect(
      getLongestOnDietSequenceCase.execute({
        userId: "wrong-user-id",
      })
    ).rejects.instanceOf(UserNotFoundError);
  });
});
