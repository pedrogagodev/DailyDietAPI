import { authenticate } from "@/http/controllers/users/authenticate";
import { changePassword } from "@/http/controllers/users/change-password";
import { editProfile } from "@/http/controllers/users/edit-profile";
import { profile } from "@/http/controllers/users/profile";
import { refresh } from "@/http/controllers/users/refresh";
import { register } from "@/http/controllers/users/register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { changePasswordBodySchema } from "@/schemas/users/change-password-schema";
import { changePasswordResponseSchema } from "@/schemas/users/change-password-schema";
import {
  editProfileBodySchema,
  editProfileResponseSchema,
} from "@/schemas/users/edit-profile-schema";
import { getProfileResponseSchema } from "@/schemas/users/get-profile-schema";
import {
  loginBodySchema,
  loginResponseSchema,
} from "@/schemas/users/login-schema";
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

  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "POST",
    url: "/login",
    schema: {
      body: loginBodySchema,
      tags: ["users"],
      summary: "Login a user",
      description: "Login a user",

      response: loginResponseSchema,
    },
    onRequest: [verifyJWT],
    handler: authenticate,
  });
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "PATCH",
    url: "/token/refresh",
    schema: {
      tags: ["users"],
      summary: "Refresh a user's token",
      description: "Refresh a user's token",

      response: {
        200: {
          description: "Token refreshed successfully",
          type: "object",
          properties: {
            token: { type: "string" },
          },
        },
      },
    },
    onRequest: [verifyJWT],
    handler: refresh,
  });

  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "GET",
    url: "/me",
    schema: {
      tags: ["users"],
      summary: "Get the current user's profile",
      description: "Get the current user's profile",

      response: getProfileResponseSchema,
    },
    onRequest: [verifyJWT],
    handler: profile,
  });
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "PUT",
    url: "/me",
    schema: {
      body: editProfileBodySchema,
      tags: ["users"],
      summary: "Edit the current user's profile",
      description: "Edit the current user's profile",

      response: editProfileResponseSchema,
    },
    onRequest: [verifyJWT],
    handler: editProfile,
  });
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "PUT",
    url: "/me/password",
    schema: {
      body: changePasswordBodySchema,
      tags: ["users"],
      summary: "Change the current user's password",
      description: "Change the current user's password",

      response: changePasswordResponseSchema,
    },
    onRequest: [verifyJWT],
    handler: changePassword,
  });
}
