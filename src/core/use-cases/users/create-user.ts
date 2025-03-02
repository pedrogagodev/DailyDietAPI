import type { User } from "@/core/entities/user";
import type {
  UsersRepository,
  CreateUserData,
} from "@/core/repositories/users-repository";

export class CreateUserUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async create(data: CreateUserData): Promise<User> {
    const checkIfUserExists = await this.usersRepository.findByEmail(
      data.email
    );
    if (checkIfUserExists) {
      throw new Error("Email already in use");
    }
    return this.usersRepository.create(data);
  }
}
