import { mealsRoutes } from "@/routes/meal-routes";
import { usersRoutes } from "@/routes/user-routes";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./config/env";
import { errorHandler } from "./http/middlewares/error-handler";

export const app = fastify();

app.setErrorHandler(errorHandler);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(mealsRoutes);


