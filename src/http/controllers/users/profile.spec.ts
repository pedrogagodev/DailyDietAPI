import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    await request(app.server).post("/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    const authResponse = await request(app.server).post("/login").send({
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });

  it("should not be able to get user profile with invalid token", async () => {
    await request(app.server).post("/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    await request(app.server).post("/login").send({
      email: "john.doe@example.com",
      password: "JohnDoe123456",
    });

    const invalidToken = "invalid";

    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.statusCode).toEqual(401);
  });
});
