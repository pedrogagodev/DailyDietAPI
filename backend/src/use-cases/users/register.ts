import type { User } from "@/core/entities/user";
import type {
  RegisterUserData,
  UsersRepository,
} from "@/core/repositories/users-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import bcrypt from "bcrypt";

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    password,
  }: RegisterUserData): Promise<RegisterUseCaseResponse> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);
    if (checkIfUserExists) {
      throw new UserAlreadyExistsError();
    }
    const password_hash = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
