import type { User } from "@/core/entities/user";
import type {
  RegisterUserDataRepo,
  UsersRepository,
} from "@/core/repositories/users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: RegisterUserDataRepo): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "USER" as const,
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
  async update(id: string, data: Partial<User>): Promise<User> {
    const userIndex = this.items.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    this.items[userIndex] = { ...this.items[userIndex], ...data };
    return Promise.resolve(this.items[userIndex]);
  } 
}
