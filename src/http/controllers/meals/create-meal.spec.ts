import { randomUUID } from "node:crypto";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let userData = {
  token: "",
  userId: "",
};

describe("Create Meal e2e", () => {
  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a meal", async () => {
    const { token, userId } = userData;

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
    const { token } = userData;

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
    const invalidUserId = randomUUID();

    const invalidToken = app.jwt.sign(
      {
        role: "USER",
      },
      {
        sub: invalidUserId,
      }
    );

    const response = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send({
        name: "Pizza",
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      message: "User not found.",
      status: "error",
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
