import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Total Meals Off Diet Number e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get total meals off diet number", async () => {
    const { token, userId } = await createAndAuthenticateUser(app);

    const createMealResponse = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        userId: userId,
        description: "Pizza with cheese and pepperoni",
        isOnDiet: false,
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const getMealsOffDietNumberResponse = await request(app.server)
      .get(`/me/${userId}/meals/off-diet`)
      .set("Authorization", `Bearer ${token}`);

    expect(getMealsOffDietNumberResponse.statusCode).toEqual(200);
    expect(getMealsOffDietNumberResponse.body).toEqual({
      mealsNumber: 1,
    });
  });

  it("not should to be get total meals off diet number with invalid user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const invalidUserId = null;

    const getMealsOffDietNumberResponse = await request(app.server)
      .get(`/me/${invalidUserId}/meals/off-diet`)
      .set("Authorization", `Bearer ${token}`);

    expect(getMealsOffDietNumberResponse.statusCode).toEqual(400);
    expect(getMealsOffDietNumberResponse.body).toEqual({
      details: {
        userId: ["Invalid user id."]
      },
      message: "Validation error",
      status: "error"
    });
  });

  it("not should to be get total meals off diet number without token", async () => {
    const getMealsOffDietNumberResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/off-diet")
      .set("Authorization", "Bearer invalid-token");

    expect(getMealsOffDietNumberResponse.statusCode).toEqual(401);
    expect(getMealsOffDietNumberResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });
});
