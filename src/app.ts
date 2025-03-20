import { mealsRoutes } from "@/routes/meal-routes";
import { usersRoutes } from "@/routes/user-routes";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./config/env";
import { errorHandler } from "./http/middlewares/error-handler";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

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

app.register(fastifyCors, {origin: "*"})

app.register(fastifySwagger, {
  swagger: {
      info: {
          title: 'Daily Diet API',
          description: 'API to manage daily diet',
          version: '1.0.0'
      },
      host: 'localhost:3333',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
          bearerAuth: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
          }
      }
  }
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
      docExpansion: 'list',
      deepLinking: false
  },
  staticCSP: true
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(mealsRoutes);


