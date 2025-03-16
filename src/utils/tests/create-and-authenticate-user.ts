import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const registerResponse = await request(app.server).post("/register").send({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "JohnDoe123456",
  });

  const authResponse = await request(app.server).post("/login").send({
    email: "john.doe@example.com",
    password: "JohnDoe123456",
  });

  const { id: userId } = registerResponse.body;
  const { token } = authResponse.body;

  return {
    token,
    userId,
  };
}
