import { authenticate } from "@/http/controllers/users/authenticate";
import { register } from "@/http/controllers/users/register";
import type { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/register", register);

  app.post("/login", authenticate);
}
