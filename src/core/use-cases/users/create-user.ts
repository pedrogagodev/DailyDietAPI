import type { User } from "@/core/entities/user";
import type {
  CreateUserData,
  UsersRepository,
} from "@/core/repositories/users-repository";
import bcrypt from "bcrypt";

export class CreateUserUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async create({ name, email, password }: CreateUserData): Promise<User> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);
    if (checkIfUserExists) {
      throw new Error("Email already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Password: ${password} | Hashed Password: ${hashedPassword}`);
    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
