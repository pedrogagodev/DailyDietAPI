import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import bcrypt from "bcrypt";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "JonDoe123",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "JonDoe123",
    });

    const isPasswordHashed = await bcrypt.compare(
      "JonDoe123",
      user.password_hash
    );

    expect(isPasswordHashed).toBe(true);
  });

  it("should not able to register email twice", async () => {
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
