import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Longest On Diet Sequence e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get longest on diet sequence", async () => {
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

    const getLongestOnDietSequenceResponse = await request(app.server)
      .get(`/me/${userId}/meals/longest-on-diet-sequence`)
      .set("Authorization", `Bearer ${token}`);

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(200);
  });

  it("not should to be get longest on diet sequence without user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const getLongestOnDietSequenceResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/longest-on-diet-sequence")
      .set("Authorization", `Bearer ${token}`);

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(400);
  });

  it("not should to be get longest on diet sequence without token", async () => {
    const getLongestOnDietSequenceResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/longest-on-diet-sequence")
      .set("Authorization", "Bearer invalid-token");

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(401);
  });
});
