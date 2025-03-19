import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let userData = {
  token: "",
  userId: "",
};

describe("Register e2e", () => {
  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to edit profile", async () => {
    const { token } = userData;

    const response = await request(app.server)
      .put("/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe2",
        email: "john.doe2@example.com",
        currentPassword: "JohnDoe123456",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      user: {
        id: userData.userId,
        name: "John Doe2",
        email: "john.doe2@example.com",
      },
    }); 
  });

  it("should not be able to edit profile with duplicate email", async () => {
    const { token } = userData;

    await request(app.server).post("/register").send({
      name: "John Doe",
      email: "duplicate@example.com",
      password: "JohnDoe123456",
    });

    const response = await request(app.server)
      .put("/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe",
        email: "duplicate@example.com",
        currentPassword: "JohnDoe123456",
      });

    expect(response.statusCode).toEqual(409);
    expect(response.body).toEqual({
      message: "E-mail already in use",
      status: "error",
    });
  });

  it("should validate required fields", async () => {
    const { token } = userData;

    const response = await request(app.server)
      .put("/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        email: "invalid-email",
        currentPassword: "123",
      });

    expect(response.statusCode).toEqual(400);
  });
});
