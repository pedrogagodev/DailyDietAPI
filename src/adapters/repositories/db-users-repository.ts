import type { User } from "@/core/entities/user";
import type {
  CreateUserData,
  UsersRepository,
} from "@/core/repositories/users-repository";
import { query } from "../../infra/database/connection";

export class MethodsUsersRepository implements UsersRepository {
  async create({ name, email }: CreateUserData): Promise<User> {
    const result = await query(
      `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING *
        `,
      [name, email]
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await query(
      `SELECT * 
      FROM users 
      WHERE email = $1
      `,
      [email]
    );

    return result.rows[0] || null;
  }
  async findById(id: string): Promise<User | null> {
    const result = await query(
      `SELECT * 
      FROM users 
      WHERE id = $1
      `,
      [id]
    );

    return result.rows[0] || null;
  }
}
