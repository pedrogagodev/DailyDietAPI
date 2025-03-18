import { createMeal } from "@/http/controllers/meals/create-meal";
import { deleteMeal } from "@/http/controllers/meals/delete-meal";
import { getLongestOnDietSequence } from "@/http/controllers/meals/get-longest-on-diet-sequence";
import { getMealInfo } from "@/http/controllers/meals/get-meal-info";
import { getMealsOffDietNumber } from "@/http/controllers/meals/get-meals-off-diet-number";
import { getMealsOnDietNumber } from "@/http/controllers/meals/get-meals-on-diet-number";
import { getTotalMealsNumber } from "@/http/controllers/meals/get-total-meals-number";
import { listMeals } from "@/http/controllers/meals/list-meals";
import { updateMeal } from "@/http/controllers/meals/update-meal";
import { ensureMealOwnershipMiddleware } from "@/http/middlewares/ensure-meal-ownership";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/meals", createMeal);

  app.get("/me/meals", listMeals);
  app.get("/me/meals/total", getTotalMealsNumber);
  app.get("/me/meals/on-diet", getMealsOnDietNumber);
  app.get("/me/meals/off-diet", getMealsOffDietNumber);
  app.get("/me/meals/longest-on-diet-sequence", getLongestOnDietSequence);
  app.get(
    "/meals/:mealId",
    { onRequest: [ensureMealOwnershipMiddleware] },
    getMealInfo
  );

  app.put(
    "/meals/:mealId",
    { onRequest: [ensureMealOwnershipMiddleware] },
    updateMeal
  );

  app.delete(
    "/meals/:mealId",
    { onRequest: [ensureMealOwnershipMiddleware] },
    deleteMeal
  );
}
