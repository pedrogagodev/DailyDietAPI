import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const uniqueEmail = `john.doe${Math.random()}@example.com`;

  const registerResponse = await request(app.server)
    .post("/register")
    .send({
      name: "John Doe",
      email: uniqueEmail,
      password: "JohnDoe123456",
      role: isAdmin ? "ADMIN" : "USER",
    });

  const authResponse = await request(app.server).post("/login").send({
    email: uniqueEmail,
    password: "JohnDoe123456",
  });

  const userId = registerResponse.body.id;
  const { token } = authResponse.body;

  return {
    token,
    userId,
  };
}
