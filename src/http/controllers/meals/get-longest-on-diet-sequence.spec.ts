import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { randomUUID } from "node:crypto";
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
        name: "Salad",
        userId: userId,
        description: "Green salad with chicken",
        isOnDiet: true,
      });

    expect(createMealResponse.statusCode).toEqual(201);

    const getLongestOnDietSequenceResponse = await request(app.server)
      .get(`/me/${userId}/meals/longest-on-diet-sequence`)
      .set("Authorization", `Bearer ${token}`);

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(200);
    expect(getLongestOnDietSequenceResponse.body).toEqual({
      mealsSequence: 1,
    });
  });

  it("not should to be get longest on diet sequence without user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const getLongestOnDietSequenceResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/longest-on-diet-sequence")
      .set("Authorization", `Bearer ${token}`);

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(400);
    expect(getLongestOnDietSequenceResponse.body).toEqual({
      details: {
        userId: ["Invalid user id."]
      },
      message: "Validation error",
      status: "error"
    });
  });

  it("not should to be get longest on diet sequence with invalid user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const invalidUserId = randomUUID();

    const getLongestOnDietSequenceResponse = await request(app.server)
      .get(`/me/${invalidUserId}/meals/longest-on-diet-sequence`)
      .set("Authorization", `Bearer ${token}`);

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(404);
    expect(getLongestOnDietSequenceResponse.body).toEqual({
      message: "User not found.",
      status: "error",
    });
  });

  it("not should to be get longest on diet sequence without token", async () => {
    const getLongestOnDietSequenceResponse = await request(app.server)
      .get("/me/invalid-user-id/meals/longest-on-diet-sequence")
      .set("Authorization", "Bearer invalid-token");

    expect(getLongestOnDietSequenceResponse.statusCode).toEqual(401);
    expect(getLongestOnDietSequenceResponse.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });
});
