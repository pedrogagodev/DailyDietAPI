import type { Meal } from "@/core/entities/meal";
import type { MealsRepository } from "@/core/repositories/meals-repository";
import { MealNotFoundError } from "@/errors/meal-not-found";

interface GetMealInfoUseCaseRequest {
  userId: string;
  id: string;
}

interface GetMealInfoUseCaseResponse {
  meal: Meal;
}

export class GetMealInfoUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
    id,
  }: GetMealInfoUseCaseRequest): Promise<GetMealInfoUseCaseResponse> {
    const meal = await this.mealsRepository.findByUserIdAndId(userId, id);

    if (!meal) {
      throw new MealNotFoundError();
    }

    return { meal };
  }
}
