import type { UsersRepository } from "@/core/repositories/users-repository";
import { InvalidPasswordError } from "@/errors/invalid-password-error";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import bcrypt from "bcrypt";

interface ChangePasswordUseCaseRequest {
  userId: string;
  requestingUserId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}


export class ChangePasswordUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    userId,
    requestingUserId,
    currentPassword,
    newPassword,
    confirmPassword,
  }: ChangePasswordUseCaseRequest) {
    if (userId !== requestingUserId) {
      throw new UnauthorizedAccessError();
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (newPassword !== confirmPassword) {
      throw new InvalidPasswordError();
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersRepository.update(userId, {
      name: user.name,
      email: user.email,
      password_hash: hashedPassword,
    });

    return { ...user, password_hash: hashedPassword };
  }
}
