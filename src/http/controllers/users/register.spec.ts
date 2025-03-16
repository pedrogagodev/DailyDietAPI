import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    expect(response.statusCode).toEqual(201);
  });

  it("should not be able to register with duplicate email", async () => {
    await request(app.server).post("/register").send({
      name: "John Doe",
      email: "duplicate@example.com",
      password: "JohnDoe123456",
    });

    const response = await request(app.server).post("/register").send({
      name: "John Doe",
      email: "duplicate@example.com",
      password: "JohnDoe123456",
    });

    expect(response.statusCode).toEqual(409);
  });

  it("should validate required fields", async () => {
    const response = await request(app.server).post("/register").send({
      name: "",
      email: "invalid-email",
      password: "123",
    });

    expect(response.statusCode).toEqual(400);
  });
});
