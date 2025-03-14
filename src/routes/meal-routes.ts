import { createMeal } from "@/http/controllers/meals/create-meal";
import { deleteMeal } from "@/http/controllers/meals/delete-meal";
import { getMealInfo } from "@/http/controllers/meals/get-meal-info";
import { listMeals } from "@/http/controllers/meals/list-meals";
import { updateMeal } from "@/http/controllers/meals/update-meal";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import type { FastifyInstance } from "fastify";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/meals", createMeal);

  app.get("/me/:userId/meals", listMeals);

  app.get("/meals/:mealId", getMealInfo);

  app.put("/meals/:mealId", updateMeal);

  app.delete("/meals/:mealId", deleteMeal);
}
