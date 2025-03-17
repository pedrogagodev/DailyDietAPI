import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Total Meals Number e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get total meals number", async () => {
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

    const getTotalMealsNumberResponse = await request(app.server)
      .get(`/me/${userId}/meals/total`)
      .set("Authorization", `Bearer ${token}`);

    expect(getTotalMealsNumberResponse.statusCode).toEqual(200);
  });

  it("not should to be get total meals number without user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const getTotalMealsNumberResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/total")
      .set("Authorization", `Bearer ${token}`);

    expect(getTotalMealsNumberResponse.statusCode).toEqual(400);
  });

  it("not should to be get total meals number without token", async () => {
    const getTotalMealsNumberResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/total")
      .set("Authorization", "Bearer invalid-token");

    expect(getTotalMealsNumberResponse.statusCode).toEqual(401);
  });
});
