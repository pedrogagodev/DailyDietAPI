import type { User } from "@/core/entities/user";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { InvalidPasswordError } from "@/errors/invalid-password-error";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { UserNotFoundError } from "@/errors/user-not-found";
import bcrypt from "bcrypt";

interface EditProfileRequest {
  userId: string;
  requestingUserId: string;
  name?: string;
  email?: string;
  currentPassword: string;
}

interface EditProfileResponse {
  user: User;
}

export class EditProfileUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    userId,
    requestingUserId,
    name,
    email,
    currentPassword,
  }: EditProfileRequest): Promise<EditProfileResponse> {
    if (userId !== requestingUserId) {
      throw new UnauthorizedAccessError();
    }
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isCurrentPasswordValid) {
      throw new InvalidPasswordError();
    }

    if (email && email !== user.email) {
      const checkIfEmailExists = await this.usersRepository.findByEmail(email);
      if (checkIfEmailExists) {
        throw new UserAlreadyExistsError();
      }
    }

    const updatedUser = await this.usersRepository.update(userId, {
      name: name ?? user.name,
      email: email ?? user.email,
      password_hash: user.password_hash,
    });

    return { user: updatedUser };
  }
}
