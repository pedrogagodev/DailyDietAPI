import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { ListMealsUseCase } from "./list-meals";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserNotFoundError } from "@/errors/user-not-found";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let createMealCase: CreateMealUseCase;
let listMealsCase: ListMealsUseCase;

describe("List Meals Use Case", () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    createMealCase = new CreateMealUseCase(mealsRepository, usersRepository);
    listMealsCase = new ListMealsUseCase(mealsRepository, usersRepository);
  });

  it("should be able to list meals", async () => {
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

    await expect(
      listMealsCase.execute({
        userId: createdMeal.meal.userId,
        requestingUserId: createdMeal.meal.userId,
      })
    ).resolves.not.toThrow();
  });

  it("should not be able to list meals with wrong user id", async () => {
    await expect(
      listMealsCase.execute({
        userId: "wrong-user-id",
        requestingUserId: "wrong-user-id",
      })
    ).rejects.instanceOf(UserNotFoundError);
  });

  it("should not be able to list meals with another user's id", async () => {
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
    
    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
      description: "A simple breakfast",
      requestingUserId: user.id,
    });
    
    await expect(
      listMealsCase.execute({
        userId: user.id,
        requestingUserId: anotherUser.id
      })
    ).rejects.toThrowError(UnauthorizedAccessError);
  });
});