import type { User } from "@/core/entities/user";
import type { CreateUserUseCase } from "@/core/use-cases/users/create-user";
import type { FastifyReply, FastifyRequest } from "fastify";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class UsersController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { name, email, password } = request.body as CreateUserRequest;
      const user: User = await this.createUserUseCase.create({
        name,
        email,
        password,
      });
      return reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send({ error: (error as Error).message });
    }
  }
}
