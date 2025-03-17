import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("List Meals e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to list all meals", async () => {
    const { token, userId } = await createAndAuthenticateUser(app);

    const createMealResponse = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        userId: userId,
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const listMealsResponse = await request(app.server)
      .get(`/me/${userId}/meals`)
      .set("Authorization", `Bearer ${token}`);

    expect(listMealsResponse.statusCode).toEqual(200);
    expect(listMealsResponse.body).toEqual(expect.any(Object));
  });

  it("not should to be list meals without user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const invalidUserId = null;

    const listMealsResponse = await request(app.server)
      .get(`/me/${invalidUserId}/meals`)
      .set("Authorization", `Bearer ${token}`);

    expect(listMealsResponse.statusCode).toEqual(400);
    expect(listMealsResponse.body).toEqual({
      details: {
        userId: ["Invalid user id."]
      },
      message: "Validation error",
      status: "error"
    });
  });

  it("not should to be list meals without token", async () => {
    const listMealsResponse = await request(app.server)
      .get("/me/invalid-user-id/meals")
      .set("Authorization", "Bearer invalid-token");

    expect(listMealsResponse.statusCode).toEqual(401);
    expect(listMealsResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });
});
