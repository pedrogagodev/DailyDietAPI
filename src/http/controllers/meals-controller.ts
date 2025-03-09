import type { Meal } from "@/core/entities/meal";
import type { CreateMealUseCase } from "@/core/use-cases/meals/create-meal";
import type { FastifyReply, FastifyRequest } from "fastify";

interface CreateMealRequest {
  userId: string;
  name: string;
  description?: string | null;
  isOnDiet: boolean;
}

export class MealsController {
  private createMealUseCase: CreateMealUseCase;

  constructor(createMealUseCase: CreateMealUseCase) {
    this.createMealUseCase = createMealUseCase;
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId, name, description, isOnDiet } =
        request.body as CreateMealRequest;

      const meal: Meal = await this.createMealUseCase.create({
        userId,
        name,
        description: description ?? null,
        isOnDiet,
      });
      return reply.status(201).send(meal);
    } catch (error) {
      reply.status(400).send({ error: (error as Error).message });
    }
  }
}
