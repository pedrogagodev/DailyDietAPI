import type { User } from "../entities/user";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface UsersRepository {
  create(data: CreateUserData): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
