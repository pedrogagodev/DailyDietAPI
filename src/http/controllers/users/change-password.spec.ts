import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let userData = {
  token: "",
  userId: "",
};

describe("Change Password e2e", () => {
  beforeAll(async () => {
    await app.ready();
    userData = await createAndAuthenticateUser(app);
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to change password", async () => {
    const { token } = userData;

    const response = await request(app.server)
      .put("/me/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        currentPassword: "JohnDoe123456",
        newPassword: "NewPassword123",
        confirmPassword: "NewPassword123",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      message: "Password changed successfully",
    }); 
  });


  it("should validate required fields", async () => {
    const { token } = userData;

    const response = await request(app.server)
      .put("/me/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    expect(response.statusCode).toEqual(400);
  });

  it("should not be able to change password with wrong current password", async () => {
    const { token } = userData;

    const response = await request(app.server)
      .put("/me/password")
      .set("Authorization", `Bearer ${token}`)
             .send({
        currentPassword: "WrongPassword123",
        newPassword: "NewPassword123",
        confirmPassword: "NewPassword123",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      message: "Please, provide a valid password.",
      status: "error",
    });
  });

  it("should not be able to change password with new password different from confirm password", async () => {
    const { token } = userData;

    const response = await request(app.server)
      .put("/me/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        currentPassword: "JohnDoe123456",
        newPassword: "NewPassword123",
        confirmPassword: "WrongPassword123",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      message: "Please, provide a valid password.",
      status: "error",
    });
  });

  it("should not be able to change password for another user", async () => {



    const userMalicious = await request(app.server).post("/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "Malicious123",
    });

    const { token: maliciousToken } = userMalicious.body;

    const response = await request(app.server)
      .put("/me/password")
      .set("Authorization", `Bearer ${maliciousToken}`)
      .send({
        currentPassword: "JohnDoe123456",
        newPassword: "NewPassword123",
        confirmPassword: "NewPassword123",
      });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toEqual({
      message: "Unauthorized. Invalid or expired token.",
    });
  });
});