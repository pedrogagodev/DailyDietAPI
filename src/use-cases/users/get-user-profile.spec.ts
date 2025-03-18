import { UserNotFoundError } from "@/errors/user-not-found";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await bcrypt.hash("JonDoe123", 10),
    });

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    });

    expect(user).not.toBeNull();
    expect(user?.name ?? "").toEqual("John Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
