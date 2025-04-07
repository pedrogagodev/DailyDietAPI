import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let userData = {
  token: "",
  userId: "",
};

describe("Delete Meal e2e", () => {
  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a meal", async () => {
    const { token, userId } = userData;

    const createMealResponse = await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        userId: userId,
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
        mealTime: "10:00",
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const { meal } = createMealResponse.body;
    const mealId = meal.id;

    const deleteMealResponse = await request(app.server)
      .delete(`/me/meals/${mealId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteMealResponse.statusCode).toEqual(200);
  });

  it("not should to be delete meal without meal id", async () => {
    const { token, userId } = userData;

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        userId: userId,
      });

    const deleteMealResponse = await request(app.server)
      .delete("/me/meals/null-meal-id")
      .set("Authorization", `Bearer ${token}`);
    expect(deleteMealResponse.statusCode).toEqual(400);
    expect(deleteMealResponse.body).toEqual({
      message: "Invalid meal ID format",
      status: "error",
    });
  });

  it("not should to be delete meal without token", async () => {
    const deleteMealResponse = await request(app.server)
      .delete("/me/meals/invalid-meal-id")
      .set("Authorization", "Bearer invalid-token");

    expect(deleteMealResponse.statusCode).toEqual(401);
    expect(deleteMealResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });

  it("should not be able to delete a meal from another user", async () => {
    const { token } = userData;

    const createMealResponse = await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
        mealTime: "10:00",
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const { token: anotherUserToken } = await createAndAuthenticateUser(
      app,
      false
    );

    const { meal } = createMealResponse.body;
    const mealId = meal.id;

    const deleteMealResponse = await request(app.server)
      .delete(`/me/meals/${mealId}`)
      .set("Authorization", `Bearer ${anotherUserToken}`);

    expect(deleteMealResponse.statusCode).toEqual(403);
    expect(deleteMealResponse.body).toEqual({
      message: "You are not authorized to access this resource.",
      status: "error",
    });
  });
});
