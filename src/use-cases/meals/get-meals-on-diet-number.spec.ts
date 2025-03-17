import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetMealsOnDietNumberUseCase } from "./get-meals-on-diet-number";
import { UserNotFoundError } from "@/errors/user-not-found";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealCase: CreateMealUseCase;
let getMealsOnDietNumberCase: GetMealsOnDietNumberUseCase;

describe("Get Total Meals On Diet Number Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
    getMealsOnDietNumberCase = new GetMealsOnDietNumberUseCase(
      mealsRepository,
      usersRepository
    );

    usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });
  });

  it("should be able to get total meals on diet number", async () => {
    const user = await usersRepository.create({
      name: "Test User",
      email: "test@example.com",
      password_hash: "hashed-password",
    });

    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
      description: "A simple breakfast",
    });

    const totalMealsNumber = await getMealsOnDietNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsNumber).toBe(1);
  });

  it("should be able to get total meals on diet number", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
      name: "Bread with eggs2",
      isOnDiet: false,
      userId: "user-1",
      description: "A simple breakfast",
    });

    await createMealCase.execute({
      name: "Bread with eggs3",
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

    const totalMealsNumber = await getMealsOnDietNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsNumber).toBe(3);
  });

  it("should not be able to get total meals on diet number with wrong user id", async () => {
    await expect(
      getMealsOnDietNumberCase.execute({
        userId: "wrong-user-id",
      })
    ).rejects.instanceOf(UserNotFoundError);
  });
});
