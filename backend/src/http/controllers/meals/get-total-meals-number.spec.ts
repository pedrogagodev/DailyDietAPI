import { app } from "@/app";
import { Meal } from "@/core/entities/meal";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { randomUUID } from "node:crypto";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let userData: {
  token: string;
  userId: string;
};
describe("Get Total Meals Number e2e", () => {

  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get total meals number", async () => {
    const { token } = userData;

    const createMealResponse = await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        description: "Pizza with cheese and pepperoni",
        isOnDiet: true,
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const getTotalMealsNumberResponse = await request(app.server)
      .get("/me/meals/total")
      .set("Authorization", `Bearer ${token}`);

    expect(getTotalMealsNumberResponse.statusCode).toEqual(200);
    expect(getTotalMealsNumberResponse.body).toEqual({
      mealsNumber: 1,
    });
  });

  it("not should to be get total meals number without token", async () => {
    const getTotalMealsNumberResponse = await request(app.server)
      .get("/me/meals/total")
      .set("Authorization", "Bearer invalid-token");

    expect(getTotalMealsNumberResponse.statusCode).toEqual(401);
    expect(getTotalMealsNumberResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });

  it("should only return meals number belonging to the authenticated user", async () => {
    const firstUser = await createAndAuthenticateUser(app, false);

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${firstUser.token}`)
      .send({
        name: "First user meal",
        description: "This meal belongs to the first user",
        isOnDiet: true,
      });

      await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${firstUser.token}`)
      .send({
        name: "Second meal of first user",
        description: "This meal belongs to the first user",
        isOnDiet: false,
      });

    const secondUser = await createAndAuthenticateUser(app, false);

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${secondUser.token}`)
      .send({
        name: "Second user meal",
        description: "This meal belongs to the second user",
        isOnDiet: false,
      });

    const getTotalMealsNumberResponseOfFirstUser = await request(app.server)
      .get("/me/meals/total")
      .set("Authorization", `Bearer ${firstUser.token}`);

    expect(getTotalMealsNumberResponseOfFirstUser.statusCode).toEqual(200);
    expect(getTotalMealsNumberResponseOfFirstUser.body).toEqual({
      mealsNumber: 2,
    });

    const getTotalMealsNumberResponseOfSecondUser = await request(app.server)
      .get("/me/meals/total")
      .set("Authorization", `Bearer ${secondUser.token}`);

    expect(getTotalMealsNumberResponseOfSecondUser.statusCode).toEqual(200);
    expect(getTotalMealsNumberResponseOfSecondUser.body).toEqual({
      mealsNumber: 1,
    });

  });
});
