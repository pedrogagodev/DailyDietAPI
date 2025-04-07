import { app } from "@/app";
import type { Meal } from "@/core/entities/meal";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let userData: {
  token: string;
  userId: string;
};

describe("List Meals e2e", () => {
  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to list all meals", async () => {
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

    const listMealsResponse = await request(app.server)
      .get("/me/meals")
      .set("Authorization", `Bearer ${token}`);


    expect(listMealsResponse.statusCode).toEqual(200);
    expect(listMealsResponse.body).toEqual(expect.any(Object));
  });

  it("not should to be list meals without token", async () => {
    const listMealsResponse = await request(app.server)
      .get("/me/meals")
      .set("Authorization", "Bearer invalid-token");

    expect(listMealsResponse.statusCode).toEqual(401);
    expect(listMealsResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });

  it("should only return meals belonging to the authenticated user", async () => {
    const firstUser = await createAndAuthenticateUser(app, false);

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${firstUser.token}`)
      .send({
        name: "First user meal",
        description: "This meal belongs to the first user",
        isOnDiet: true,
        mealTime: "10:00",
      });

    const secondUser = await createAndAuthenticateUser(app, false);

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${secondUser.token}`)
      .send({
        name: "Second user meal",
        description: "This meal belongs to the second user",
        isOnDiet: false,
        mealTime: "10:00",
      });

    const listMealsResponse = await request(app.server)
      .get("/me/meals")
      .set("Authorization", `Bearer ${secondUser.token}`);

    expect(listMealsResponse.statusCode).toEqual(200);

    const meals = listMealsResponse.body.meals;
    expect(Array.isArray(meals)).toBe(true);


    for (const meal of meals) {
      expect(meal.userId).toEqual(secondUser.userId);
    }

    const mealNames = meals.map((meal: Meal) => meal.name);
    expect(mealNames).toContain("Second user meal");
    expect(mealNames).not.toContain("First user meal");
  });
});
