import { createMeal } from "@/http/controllers/meals/create-meal";
import { listMeals } from "@/http/controllers/meals/list-meals";
import { updateMeal } from "@/http/controllers/meals/update-meal";

import type { FastifyInstance } from "fastify";

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/meals", createMeal);

  app.get("/meals/:userId", listMeals);

  app.put("/meals/:id", updateMeal);
}
