import { createMeal } from "@/http/controllers/meals/create-meal";
import type { FastifyInstance } from "fastify";

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/meals", createMeal);
}
