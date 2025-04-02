import { UserNotFoundError } from "@/errors/user-not-found";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await bcrypt.hash("JonDoe123", 10),
    });

    const { user } = await authenticateUseCase.execute({
      email: "johndoe@example.com",
      password: "JonDoe123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not to able to authenticate with wrong email", async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "JonDoe123",
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it("should not to able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await bcrypt.hash("JonDoe123", 10),
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "JonDoe1212223",
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
