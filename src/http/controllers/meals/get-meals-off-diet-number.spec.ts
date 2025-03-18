import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let userData: {
  token: string;
  userId: string;
};

describe("Get Total Meals Off Diet Number e2e", () => {
  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get total meals off diet number", async () => {
    const { token } = userData;

    const createMealResponse = await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pizza",
        description: "Pizza with cheese and pepperoni",
        isOnDiet: false,
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const getMealsOffDietNumberResponse = await request(app.server)
      .get("/me/meals/off-diet")
      .set("Authorization", `Bearer ${token}`);

    expect(getMealsOffDietNumberResponse.statusCode).toEqual(200);
    expect(getMealsOffDietNumberResponse.body).toEqual({
      mealsNumber: 1,
    });
  });

  it("not should to be get total meals off diet number without token", async () => {
    const getMealsOffDietNumberResponse = await request(app.server)
      .get("/me/meals/off-diet")
      .set("Authorization", "Bearer invalid-token");

    expect(getMealsOffDietNumberResponse.statusCode).toEqual(401);
    expect(getMealsOffDietNumberResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });
  it("should only return meals off diet number belonging to the authenticated user", async () => {
    const firstUser = await createAndAuthenticateUser(app, false);

    await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${firstUser.token}`)
      .send({
        name: "First user meal",
        description: "This meal belongs to the first user",
        isOnDiet: true,
      });

      await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${firstUser.token}`)
      .send({
        name: "Second meal of first user",
        description: "This meal belongs to the first user",
        isOnDiet: false,
      });

    const secondUser = await createAndAuthenticateUser(app, false);

    await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${secondUser.token}`)
      .send({
        name: "Second user meal",
        description: "This meal belongs to the second user",
        isOnDiet: true,
      });

    const getMealsOffDietNumberResponseOfFirstUser = await request(app.server)
      .get("/me/meals/off-diet")
      .set("Authorization", `Bearer ${firstUser.token}`);

    expect(getMealsOffDietNumberResponseOfFirstUser.statusCode).toEqual(200);
    expect(getMealsOffDietNumberResponseOfFirstUser.body).toEqual({
      mealsNumber: 1,
    });

    const getMealsOffDietNumberResponseOfSecondUser = await request(app.server)
      .get("/me/meals/off-diet")
      .set("Authorization", `Bearer ${secondUser.token}`);

    expect(getMealsOffDietNumberResponseOfSecondUser.statusCode).toEqual(200);
    expect(getMealsOffDietNumberResponseOfSecondUser.body).toEqual({
      mealsNumber: 0,
    });

  });
});
