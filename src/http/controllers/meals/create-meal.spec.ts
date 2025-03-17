import { randomUUID } from "node:crypto";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Meal e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a meal", async () => {
    const { token, userId } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        userId: userId,
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(201);
  });

  it("not should to be create meal with invalid token", async () => {
    await request(app.server).post("/register").send({
      name: "John Doe",
      email: "johndoe2@example.com",
      password: "JohnDoe123456",
    });

    const authResponse = await request(app.server).post("/login").send({
      email: "johndoe2@example.com",
      password: "JohnDoe123456",
    });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}invalid`)
      .send({
        name: "Pizza",
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });

  it("not should to be create meal with invalid user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const invalidUserId = randomUUID();

    const response = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        userId: invalidUserId,
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      message: "User not found.",
      status: "error",
    });
  });

  it("not should to be create meal without user id", async () => {
    await request(app.server).post("/register").send({
      name: "John Doe",
      email: "johndoe3@example.com",
      password: "JohnDoe123456",
    });

    const authResponse = await request(app.server).post("/login").send({
      email: "johndoe3@example.com",
      password: "JohnDoe123456",
    });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        userId: null,
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      message: "Validation error",
      status: "error",
      details: {
        userId: ["Expected string, received null"],
      },
    });
  });

  it("not should to be create meal without name", async () => {
    const { token, userId } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        userId: userId,
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Validation error");
    expect(response.body.details.name).toContain("Please, provide a meal name");
  });

  it("not should to be create meal without isOnDiet boolean", async () => {
    const { token, userId } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        userId: userId,
        description: "Pizza with cheese and pepperoni",
        isOnDiet: null,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Validation error");
    expect(response.body.details.isOnDiet).toContain(
      "Please, provide a valid value for isOnDiet"
    );
  });
});
