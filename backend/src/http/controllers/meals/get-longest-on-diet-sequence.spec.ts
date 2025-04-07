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
describe("Get Longest On Diet Sequence e2e", () => {

  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get longest on diet sequence", async () => {
    const { token } = userData;

    const createMealResponse = await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bread with eggs",
        description: "A simple breakfast",
        isOnDiet: true,
        mealTime: "10:00",
      });

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bread with eggs",
        description: "A simple breakfast",
        isOnDiet: true,
        mealTime: "10:00",
      });

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bread with eggs",
        description: "A simple breakfast",
        isOnDiet: true,
        mealTime: "10:00",
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const getLongestOnDietSequenceResponse = await request(app.server)
      .get("/me/meals/longest-on-diet-sequence")
      .set("Authorization", `Bearer ${token}`);

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(200);
    expect(getLongestOnDietSequenceResponse.body).toEqual({
        longestOnDietSequence: 3,
    });
  });

  it("not should to be get longest on diet sequence without token", async () => {
    const getLongestOnDietSequenceResponse = await request(app.server)
      .get("/me/meals/longest-on-diet-sequence")
      .set("Authorization", "Bearer invalid-token");

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(401);
    expect(getLongestOnDietSequenceResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });

  it("should only return longest on diet sequence belonging to the authenticated user", async () => {
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

      await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${firstUser.token}`)
      .send({
        name: "Second meal of first user",
        description: "This meal belongs to the first user",
        isOnDiet: true,
        mealTime: "10:00",
      });

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${firstUser.token}`)
      .send({
        name: "Third meal of first user",
        description: "This meal belongs to the first user",
        isOnDiet: false,
        mealTime: "10:00",
      });

    await request(app.server)
      .post("/me/meals")
      .set("Authorization", `Bearer ${firstUser.token}`)
      .send({
        name: "Fourth meal of first user",
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

    const getLongestOnDietSequenceResponseOfFirstUser = await request(app.server)
      .get("/me/meals/longest-on-diet-sequence")
      .set("Authorization", `Bearer ${firstUser.token}`);

    expect(getLongestOnDietSequenceResponseOfFirstUser.statusCode).toEqual(200);
    expect(getLongestOnDietSequenceResponseOfFirstUser.body).toEqual({
      longestOnDietSequence: 2,
    });

    const getLongestOnDietSequenceResponseOfSecondUser = await request(app.server)
      .get("/me/meals/longest-on-diet-sequence")
      .set("Authorization", `Bearer ${secondUser.token}`);

    expect(getLongestOnDietSequenceResponseOfSecondUser.statusCode).toEqual(200);
    expect(getLongestOnDietSequenceResponseOfSecondUser.body).toEqual({
      longestOnDietSequence: 0,
    });

  });
});
