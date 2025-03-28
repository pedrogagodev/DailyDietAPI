import type { User } from "@/core/entities/user";
import type {
  RegisterUserDataRepo,
  UsersRepository,
} from "@/core/repositories/users-repository";
import { query } from "../infra/database/connection";

export class MethodsUsersRepository implements UsersRepository {
  async create({
    name,
    email,
    password_hash,
  }: RegisterUserDataRepo): Promise<User> {
    const result = await query(
      `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, email, password_hash]
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

  async update(id: string, data: Partial<User>): Promise<User> {
    const result = await query(
      `UPDATE users 
      SET name = $1, email = $2, password_hash = $3 
      WHERE id = $4 
      RETURNING *`,
      [data.name ?? null, data.email ?? null, data.password_hash ?? null, id]
    );
    return result.rows[0];
  }
}
