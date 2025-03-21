import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request.agent(app.server).post("/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    const response = await request.agent(app.server).post("/login").send({
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    expect(response.statusCode).toEqual(200);
  });

  it("should not be able to authenticate with invalid credentials", async () => {
    await request.agent(app.server).post("/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    const response = await request.agent(app.server).post("/login").send({
      email: "john.doe@example.com",
      password: "invalid-password",
    });

    expect(response.statusCode).toEqual(404); // #TODO: better handle the error to return the correct code
    expect(response.body).toEqual({
      message: "User not found.",
    });
  });

  it("should validate required fields", async () => {
    const response = await request.agent(app.server).post("/login").send({
      email: "",
      password: "",
    });

    expect(response.statusCode).toEqual(500); // #TODO: better handle the error to return the correct code
    expect(response.body).toEqual({
      message:
        "body/email Please enter a valid email, body/password Please enter a valid password",
    });
  });
});
