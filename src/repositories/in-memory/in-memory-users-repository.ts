import type { User } from "@/core/entities/user";
import type {
  RegisterUserDataRepo,
  UsersRepository,
} from "@/core/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: RegisterUserDataRepo): Promise<User> {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password: data.password_hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(user);

    return Promise.resolve(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email);
    return Promise.resolve(user || null);
  }
  async findById(id: string): Promise<User | null> {
    const user = this.items.find(user => user.id === id);
    return Promise.resolve(user || null);
  }
}
