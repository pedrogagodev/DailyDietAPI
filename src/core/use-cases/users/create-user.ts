import type { User } from "@/core/entities/user";
import type {
  CreateUserData,
  UsersRepository,
} from "@/core/repositories/users-repository";
import bcrypt from "bcrypt";
import { z } from "zod";

export class CreateUserUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async create({ name, email, password }: CreateUserData): Promise<User> {
    const createAccountSchema = z.object({
      name: z.string().min(1, { message: "Please, provide a name" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z
        .string()
        .min(6, { message: "Invalid password" })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    });

    const result = createAccountSchema.safeParse({ name, email, password });

    if (result.success === false) {
      const errors = result.error.errors.map(
        err => `${err.path.join(".")}: ${err.message}`
      );

      console.error("Failed to create user account", errors);

      throw new Error(`Failed to create user account: ${errors.join(", ")}`);
    }

    const checkIfUserExists = await this.usersRepository.findByEmail(email);
    if (checkIfUserExists) {
      throw new Error("Email already in use");
    }
    const password_hash = await bcrypt.hash(password, 10);
    return this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
