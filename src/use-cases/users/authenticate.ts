import type {
  AuthUserData,
  UsersRepository,
} from "@/core/repositories/users-repository";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import bcrypt from "bcrypt";

export class AuthenticateUserCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async authenticate({ email, password }: AuthUserData) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }
  }
}
