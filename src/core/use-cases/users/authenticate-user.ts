import type {
  AuthUserData,
  UsersRepository,
} from "@/core/repositories/users-repository";
import bcrypt from "bcrypt";

export class AuthenticateUserCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async auth({ email, password }: AuthUserData) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error("Invalid password")
    }
  } 
}
