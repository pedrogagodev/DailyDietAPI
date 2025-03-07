import type { User } from "../entities/user";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface AuthUserData {
  email: string;
  password: string;
}
export interface CreateUserDataRepo {
  name: string;
  email: string;
  password_hash: string;
}

export interface UsersRepository {
  create(data: CreateUserDataRepo): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
