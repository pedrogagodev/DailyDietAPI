import type { User } from "@/core/entities/user";
import type {
  AuthUserData,
  UsersRepository,
} from "@/core/repositories/users-repository";
import { UserNotFoundError } from "@/errors/user-not-found";
import bcrypt from "bcrypt";

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    email,
    password,
  }: AuthUserData): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UserNotFoundError();
    }

    return { user };
  }
}
