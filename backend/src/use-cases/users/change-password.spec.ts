import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { InvalidPasswordError } from "@/errors/invalid-password-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { ChangePasswordUseCase } from "./change-password";

let usersRepository: InMemoryUsersRepository;
let changePasswordUseCase: ChangePasswordUseCase;

describe("Change Password Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    changePasswordUseCase = new ChangePasswordUseCase(usersRepository);
  });

  it("should be able to change password", async () => {
    const password = "hashed-password";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: hashedPassword,
    });

    const userUpdated = await changePasswordUseCase.execute({
      userId: user.id,
      requestingUserId: user.id,
      currentPassword: password,
      newPassword: "new-password",
      confirmPassword: "new-password",
    });

    expect(userUpdated.id).toEqual(expect.any(String));
    expect(userUpdated.name).toEqual("John Doe");
    expect(userUpdated.email).toEqual("johndoe@example.com");
    expect(userUpdated.password_hash).not.toEqual(hashedPassword);
  });

  it("should not able to change password with wrong user id", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "hashed-password",
    });

    await expect(() =>
      changePasswordUseCase.execute({
        userId: user.id,
        requestingUserId: "2",
        currentPassword: "hashed-password",
        newPassword: "new-password",
        confirmPassword: "new-password",
      })
    ).rejects.toBeInstanceOf(UnauthorizedAccessError);
  });

  it("should not able to change password with wrong current password", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "hashed-password",
    });

    await expect(() =>
      changePasswordUseCase.execute({
        userId: user.id,
        requestingUserId: user.id,
        currentPassword: "wrong-password",
        newPassword: "new-password",
        confirmPassword: "new-password",
      })
    ).rejects.toBeInstanceOf(InvalidPasswordError);
  });

  it("should not able to change password with new password different from confirm password", async () => {
    const password = "hashed-password";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: hashedPassword,
    });

    await usersRepository.create({
      name: "John Doe 2",
      email: "johndoe2@example.com",
      password_hash: hashedPassword,
    });

    await expect(() =>
      changePasswordUseCase.execute({
        userId: user.id,
        requestingUserId: user.id,
        currentPassword: password,
        newPassword: "new-password",
        confirmPassword: "wrong-password",
      })
    ).rejects.toBeInstanceOf(InvalidPasswordError);
  });

  it("should not able to change password for another user", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "hashed-password",
    });

    await expect(() =>
      changePasswordUseCase.execute({
        userId: user.id,
        requestingUserId: "2",
        currentPassword: "hashed-password",
        newPassword: "new-password",
        confirmPassword: "new-password",
      })
    ).rejects.toBeInstanceOf(UnauthorizedAccessError); 
  });
});
