import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { InvalidPasswordError } from "@/errors/invalid-password-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { EditProfileUseCase } from "./edit-profile";

let usersRepository: InMemoryUsersRepository;
let editProfileUseCase: EditProfileUseCase;

describe("Edit Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    editProfileUseCase = new EditProfileUseCase(usersRepository);
  });

  it("should be able to edit profile", async () => {
    const password = "hashed-password";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: hashedPassword,
    });

    const userUpdated = await editProfileUseCase.execute({
      userId: user.id,
      requestingUserId: user.id,
      name: "John Doe Updated",
      email: "johndoe3@example.com",
      currentPassword: password,
    });

    expect(userUpdated.user.id).toEqual(expect.any(String));
    expect(userUpdated.user.name).toEqual("John Doe Updated");
    expect(userUpdated.user.email).toEqual("johndoe3@example.com");
    expect(userUpdated.user.password_hash).toEqual(hashedPassword);
  });

  it("should not able to edit profile with wrong user id", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "hashed-password",
    });

    await expect(() =>
      editProfileUseCase.execute({
        userId: user.id,
        requestingUserId: "2",
        name: "John Doe",
        email: "johndoe@example.com",
        currentPassword: "hashed-password",
      })
    ).rejects.toBeInstanceOf(UnauthorizedAccessError);
  });

  it("should not able to edit profile with wrong current password", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "hashed-password",
    });

    await expect(() =>
      editProfileUseCase.execute({
        userId: user.id,
        requestingUserId: user.id,
        currentPassword: "wrong-password",
      })
    ).rejects.toBeInstanceOf(InvalidPasswordError);
  });

  it("should not able to edit profile with email already in use", async () => {
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
      editProfileUseCase.execute({
        userId: user.id,
        requestingUserId: user.id,
        email: "johndoe2@example.com",
        currentPassword: password,
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
