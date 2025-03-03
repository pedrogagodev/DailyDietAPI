import { MealsController } from "@/adapters/controllers/meals-controller";
import { MethodsMealsRepository } from "@/adapters/repositories/db-meals-repository";
import { CreateMealUseCase } from "@/core/use-cases/meals/create-meal";
import type { FastifyInstance } from "fastify";

export async function   mealsRoutes(app: FastifyInstance) {
  const mealsRepository = new MethodsMealsRepository();
  const createMealUseCase = new CreateMealUseCase(mealsRepository);
  const mealsController = new MealsController(createMealUseCase);

  app.post("/meals", async (request, reply) => {
    await mealsController.create(request, reply);
  });
}
