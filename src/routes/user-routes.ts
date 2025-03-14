import { authenticate } from "@/http/controllers/users/authenticate";
import { profile } from "@/http/controllers/users/profile";
import { refresh } from "@/http/controllers/users/refresh";
import { register } from "@/http/controllers/users/register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/register", register);

  app.post("/login", authenticate);
  app.patch("/token/refresh", refresh);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
