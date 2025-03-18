import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { GetMealsOffDietNumberUseCase } from "./get-meals-off-diet-number";
import { UserNotFoundError } from "@/errors/user-not-found";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";

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

  });

  it("should be able to get total meals off diet number", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "hashed-password",
    });

    const createdMeal = await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: false,
      userId: user.id,
      description: "A simple breakfast",
      requestingUserId: user.id,
    });

    await createMealCase.execute({
      name: "Bread with eggs2",
      isOnDiet: false,
      userId: user.id,
      description: "A simple breakfast",
      requestingUserId: user.id,
    });

    await createMealCase.execute({
      name: "Bread with eggs3",
      isOnDiet: false,
      userId: user.id,
      description: "A simple breakfast",
      requestingUserId: user.id,
    });

    await createMealCase.execute({
      name: "Bread with eggs",
      isOnDiet: true,
      userId: user.id,
      description: "A simple breakfast",
      requestingUserId: user.id,
    });

    const totalMealsNumber = await getMealsOffDietNumberCase.execute({
      userId: createdMeal.meal.userId,
      requestingUserId: user.id,
    }); 

    expect(totalMealsNumber).toBe(3);
  });

  it("should not be able to get total meals off diet number with wrong user id", async () => {
    await expect(
      getMealsOffDietNumberCase.execute({
        userId: "wrong-user-id",
        requestingUserId: "wrong-user-id",
      })
    ).rejects.instanceOf(UserNotFoundError);
  });

  it("should not be able to get total meals off diet number with another user's id", async () => {
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
      isOnDiet: false,
      userId: user.id,
      description: "A simple breakfast",
      requestingUserId: user.id,
    });
    
    await expect(
      getMealsOffDietNumberCase.execute({
        userId: user.id,
        requestingUserId: anotherUser.id
      })
    ).rejects.toThrowError(UnauthorizedAccessError);
  });
});
