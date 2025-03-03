import { UsersController } from "@/adapters/controllers/users-controller";
import { MethodsUsersRepository } from "@/adapters/repositories/db-users-repository";
import { CreateUserUseCase } from "@/core/use-cases/users/create-user";
import type { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  const usersRepository = new MethodsUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const usersController = new UsersController(createUserUseCase);

  app.post("/register", async (request, reply) => {
    await usersController.create(request, reply);
  });
}
