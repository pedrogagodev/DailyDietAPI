import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetTotalMealsNumberUseCase } from "./get-total-meals-number";
import { UserNotFoundError } from "@/errors/user-not-found";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealCase: CreateMealUseCase;
let getTotalMealsNumberCase: GetTotalMealsNumberUseCase;

describe("Get Total Meals Number Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
    getTotalMealsNumberCase = new GetTotalMealsNumberUseCase(
      mealsRepository,
      usersRepository
    );
  });

  it("should be able to get total meals number", async () => {
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

    const totalMealsNumber = await getTotalMealsNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsNumber).toBe(1);
  });

  it("should not be able to get total meals number with wrong user id", async () => {
    await expect(
      getTotalMealsNumberCase.execute({
        userId: "wrong-user-id",
      })
    ).rejects.instanceOf(UserNotFoundError);
  });
});
