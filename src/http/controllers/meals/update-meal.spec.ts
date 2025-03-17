import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Update Meal e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a meal", async () => {
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

    const { data } = createMealResponse.body;
    const mealId = data.meal.id;

    const updateMealResponse = await request(app.server)
      .put(`/meals/${mealId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza with cheese and pepperoni",
        description: "Pizza with cheese and pepperoni",
        isOnDiet: false,
      });

    expect(updateMealResponse.statusCode).toEqual(200);
  });


  it("not should to be update meal without token", async () => {
    const updateMealResponse = await request(app.server)
      .put("/meals/invalid-meal-id")
      .set("Authorization", "Bearer invalid-token");

    expect(updateMealResponse.statusCode).toEqual(401);
    expect(updateMealResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });
});
