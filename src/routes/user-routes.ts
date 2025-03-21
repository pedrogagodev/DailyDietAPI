import { authenticate } from "@/http/controllers/users/authenticate";
import { changePassword } from "@/http/controllers/users/change-password";
import { editProfile } from "@/http/controllers/users/edit-profile";
import { profile } from "@/http/controllers/users/profile";
import { refresh } from "@/http/controllers/users/refresh";
import { register } from "@/http/controllers/users/register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import {
  registerBodySchema,
  registerResponseSchema,
} from "@/schemas/users/register-schema";
import type { FastifyInstance } from "fastify";
import type { FastifyZodOpenApiTypeProvider } from "fastify-zod-openapi";

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "POST",
    url: "/register",
    schema: {
      body: registerBodySchema,
      tags: ["users"],
      summary: "Register a new user",
      description: "Register a new user",

      response: registerResponseSchema,
    },
    handler: register,
  });

  app.post("/login", authenticate);
  app.patch("/token/refresh", refresh);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
  app.put("/me", { onRequest: [verifyJWT] }, editProfile);
  app.put("/me/password", { onRequest: [verifyJWT] }, changePassword);
}
