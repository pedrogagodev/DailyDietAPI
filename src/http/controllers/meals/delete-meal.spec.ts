import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Delete Meal e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a meal", async () => {
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

    const deleteMealResponse = await request(app.server)
      .delete(`/meals/${mealId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteMealResponse.statusCode).toEqual(200);
  });

  it("not should to be delete meal without meal id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const deleteMealResponse = await request(app.server)
      .delete("/meals/invalid-meal-id")
      .set("Authorization", `Bearer ${token}`);

    expect(deleteMealResponse.statusCode).toEqual(400);
  });

  it("not should to be delete meal without token", async () => {
    const deleteMealResponse = await request(app.server)
      .delete("/meals/invalid-meal-id")
      .set("Authorization", "Bearer invalid-token");

    expect(deleteMealResponse.statusCode).toEqual(401);
  });
});
