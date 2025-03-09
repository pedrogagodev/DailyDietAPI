import { register } from "@/http/controllers/users/register";
import type { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/register", register);
}
