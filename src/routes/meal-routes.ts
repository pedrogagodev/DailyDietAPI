import { createMeal } from "@/http/controllers/meals/create-meal";
import { deleteMeal } from "@/http/controllers/meals/delete-meal";
import { getLongestOnDietSequence } from "@/http/controllers/meals/get-longest-on-diet-sequence";
import { getMealInfo } from "@/http/controllers/meals/get-meal-info";
import { getMealsOffDietNumber } from "@/http/controllers/meals/get-meals-off-diet-number";
import { getMealsOnDietNumber } from "@/http/controllers/meals/get-meals-on-diet-number";
import { getTotalMealsNumber } from "@/http/controllers/meals/get-total-meals-number";
import { listMeals } from "@/http/controllers/meals/list-meals";
import { updateMeal } from "@/http/controllers/meals/update-meal";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import type { FastifyInstance } from "fastify";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/meals", createMeal);

  app.get("/me/:userId/meals", listMeals);
  app.get("/me/:userId/meals/total", getTotalMealsNumber);
  app.get("/me/:userId/meals/on-diet", getMealsOnDietNumber);
  app.get("/me/:userId/meals/off-diet", getMealsOffDietNumber);
  app.get("/me/:userId/meals/longest-on-diet-sequence", getLongestOnDietSequence);
  app.get("/meals/:mealId", getMealInfo);

  app.put("/meals/:mealId", updateMeal);

  app.delete("/meals/:mealId", deleteMeal);
}
