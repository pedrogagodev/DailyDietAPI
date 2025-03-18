import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let userData: {
  token: string;
  userId: string;
}

describe("Get Meal Info e2e", () => {
  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get meal info", async () => {
    const { token, userId } = userData;

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
    expect(getMealInfoResponse.body).toEqual(expect.any(Object));
  });

  it("not should to be get meal info without meal id", async () => {
    const { token } = userData;

    const nullMealId = null;

    const getMealInfoResponse = await request(app.server)
      .get(`/meals/${nullMealId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getMealInfoResponse.statusCode).toEqual(400);
    expect(getMealInfoResponse.body).toEqual({
      message: "Invalid meal ID format",
      status: "error"
    });
  });

  it("not should to be get meal info without token", async () => {
    const getMealInfoResponse = await request(app.server)
      .get("/meals/invalid-meal-id")
      .set("Authorization", "Bearer invalid-token");

    expect(getMealInfoResponse.statusCode).toEqual(401);
    expect(getMealInfoResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });

  it("not should to be get meal info of another user", async () => {
    const { token } = userData;

    const createMealResponse = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const { token: anotherUserToken } = await createAndAuthenticateUser(
      app,
      false
    );

    const { data } = createMealResponse.body;
    const mealId = data.meal.id;

    const getMealInfoResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Authorization", `Bearer ${anotherUserToken}`);

    expect(getMealInfoResponse.statusCode).toEqual(403);
    expect(getMealInfoResponse.body).toEqual({
      message: "You are not authorized to access this resource.",
      status: "error",
    });
  });
});
