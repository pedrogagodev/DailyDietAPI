import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetMealsOffDietNumberUseCase } from "./get-meals-off-diet-number";
import { UserNotFoundError } from "@/errors/user-not-found";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealCase: CreateMealUseCase;
let getMealsOffDietNumberCase: GetMealsOffDietNumberUseCase;

describe("Get Total Meals Off Diet Number Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
    getMealsOffDietNumberCase = new GetMealsOffDietNumberUseCase(
      mealsRepository,
      usersRepository
    );

    usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });
  });

  it("should be able to get total meals off diet number", async () => {
    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: "user-1",
      description: "A simple breakfast",
    });

    const totalMealsOffDietNumber = await getMealsOffDietNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsOffDietNumber).toBe(0);
  });

  it("should be able to get total meals off diet number", async () => {
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

    const totalMealsOffDietNumber = await getMealsOffDietNumberCase.execute({
      userId: createdMeal.meal.userId,
    });

    expect(totalMealsOffDietNumber).toBe(1);
  });

  it("should not be able to get total meals off diet number with wrong user id", async () => {
    await expect(
      getMealsOffDietNumberCase.execute({
        userId: "wrong-user-id",
      })
    ).rejects.instanceOf(UserNotFoundError);
  });
});