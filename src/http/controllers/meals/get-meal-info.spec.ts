import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Meal Info e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get meal info", async () => {
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

    const getMealInfoResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getMealInfoResponse.statusCode).toEqual(200);
  });

  it("not should to be get meal info without meal id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const getMealInfoResponse = await request(app.server)
      .get("/meals/invalid-meal-id")
      .set("Authorization", `Bearer ${token}`);

    expect(getMealInfoResponse.statusCode).toEqual(400);
  });

  it("not should to be get meal info without token", async () => {
    const getMealInfoResponse = await request(app.server)
      .get("/meals/invalid-meal-id")
      .set("Authorization", "Bearer invalid-token");

    expect(getMealInfoResponse.statusCode).toEqual(401);
  });
});
