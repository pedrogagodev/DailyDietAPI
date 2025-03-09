import { CreateUserUseCase } from "@/core/use-cases/users/create-user";
import { UsersController } from "@/http/controllers/users-controller";
import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import type { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  const usersRepository = new MethodsUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const usersController = new UsersController(createUserUseCase);

  app.post("/register", async (request, reply) => {
    await usersController.create(request, reply);
  });
}
