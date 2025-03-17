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
    await request(app.server).post("/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    const response = await request(app.server).post("/login").send({
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    expect(response.statusCode).toEqual(200);
  });

  it("should not be able to authenticate with invalid credentials", async () => {
    await request(app.server).post("/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    const response = await request(app.server).post("/login").send({
      email: "john.doe@example.com",
      password: "invalid-password",
    });

    expect(response.statusCode).toEqual(400);
  });

  it("should validate required fields", async () => {
    const response = await request(app.server).post("/login").send({
      email: "",
      password: "",
    });

    expect(response.statusCode).toEqual(400);
  });
});
