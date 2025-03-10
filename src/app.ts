import fastify from "fastify";
import { usersRoutes } from "@/routes/user-routes";
import { mealsRoutes } from "@/routes/meal-routes";
import { ZodError } from "zod";
import { env } from "./config/env";

export const app = fastify();

app.register(usersRoutes);
app.register(mealsRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log an external app (Sentry/Datadog)
  }

  return reply.status(500).send({ message: "Internal server error." });
});
