import type { User } from "@/core/entities/user";
import type {
  RegisterUserData,
  UsersRepository,
} from "@/core/repositories/users-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import bcrypt from "bcrypt";

export class RegisterUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ name, email, password }: RegisterUserData): Promise<User> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);
    if (checkIfUserExists) {
      throw new UserAlreadyExistsError();
    }
    const password_hash = await bcrypt.hash(password, 10);
    return this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
