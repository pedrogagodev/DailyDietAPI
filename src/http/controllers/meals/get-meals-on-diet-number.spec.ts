import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Total Meals On Diet Number e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get total meals on dietnumber", async () => {
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

    const getMealsOnDietNumberResponse = await request(app.server)
      .get(`/me/${userId}/meals/on-diet`)
      .set("Authorization", `Bearer ${token}`);

    expect(getMealsOnDietNumberResponse.statusCode).toEqual(200);
    expect(getMealsOnDietNumberResponse.body).toEqual({
      mealsNumber: 1,
    });
  });

  it("not should to be get total meals on diet number without user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const invalidUserId = null;

    const getMealsOnDietNumberResponse = await request(app.server)
      .get(`/me/${invalidUserId}/meals/on-diet`)
      .set("Authorization", `Bearer ${token}`);

    expect(getMealsOnDietNumberResponse.statusCode).toEqual(400);
    expect(getMealsOnDietNumberResponse.body).toEqual({
      details: {
        userId: ["Invalid user id."]
      },
      message: "Validation error",
      status: "error"
    });
  });

  it("not should to be get total meals on diet number without token", async () => {
    const getMealsOnDietNumberResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/on-diet")
      .set("Authorization", "Bearer invalid-token");

    expect(getMealsOnDietNumberResponse.statusCode).toEqual(401);
    expect(getMealsOnDietNumberResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });
});
