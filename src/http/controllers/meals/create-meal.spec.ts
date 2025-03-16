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
  });

  it("not should to be create meal with invalid user id", async () => {
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
        userId: "invalid-user-id",
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(400);
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
        isOnDiet: "invalid-isOnDiet",
      });

    expect(response.statusCode).toEqual(400);
  });
});
