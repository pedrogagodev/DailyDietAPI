import type { User } from "../entities/user";

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface AuthUserData {
  email: string;
  password: string;
}
export interface RegisterUserDataRepo {
  name: string;
  email: string;
  password_hash: string;
}

export interface UsersRepository {
  create(data: RegisterUserDataRepo): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
