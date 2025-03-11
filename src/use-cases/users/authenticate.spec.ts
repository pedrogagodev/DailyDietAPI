import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcrypt from "bcrypt";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

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
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "JonDoe123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not to able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

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
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
