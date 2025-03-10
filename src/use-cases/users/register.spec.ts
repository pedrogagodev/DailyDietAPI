import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import bcrypt from "bcrypt";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "JonDoe123",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "JonDoe123",
    });

    const isPasswordHashed = await bcrypt.compare("JonDoe123", user.password);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not able to register email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "JonDoe123",
    });
    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "JonDoe123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
