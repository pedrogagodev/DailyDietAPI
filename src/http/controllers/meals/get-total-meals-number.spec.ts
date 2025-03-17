import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { randomUUID } from "node:crypto";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Total Meals Number e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get total meals number", async () => {
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

    const getTotalMealsNumberResponse = await request(app.server)
      .get(`/me/${userId}/meals/total`)
      .set("Authorization", `Bearer ${token}`);

    expect(getTotalMealsNumberResponse.statusCode).toEqual(200);
    expect(getTotalMealsNumberResponse.body).toEqual({
      mealsNumber: 1,
    });
  });

  it("not should to be get total meals number without user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const getTotalMealsNumberResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/total")
      .set("Authorization", `Bearer ${token}`);

    expect(getTotalMealsNumberResponse.statusCode).toEqual(400);
    expect(getTotalMealsNumberResponse.body).toEqual({
      details: {
        userId: ["Invalid user id."]
      },
      message: "Validation error",
      status: "error"
    });
  });

  it("not should to be get total meals number with invalid user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const invalidUserId = randomUUID();

    const getTotalMealsNumberResponse = await request(app.server)
      .get(`/me/${invalidUserId}/meals/total`)
      .set("Authorization", `Bearer ${token}`);

    expect(getTotalMealsNumberResponse.statusCode).toEqual(404);
    expect(getTotalMealsNumberResponse.body).toEqual({
      message: "User not found.",
      status: "error",
    });
  });

  it("not should to be get total meals number without token", async () => {
    const getTotalMealsNumberResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/total")
      .set("Authorization", "Bearer invalid-token");

    expect(getTotalMealsNumberResponse.statusCode).toEqual(401);
    expect(getTotalMealsNumberResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });
});
