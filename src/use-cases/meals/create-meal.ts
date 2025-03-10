import type { Meal } from "@/core/entities/meal";
import type {
  MealsRepository,
  CreateMealData,
} from "@/core/repositories/meals-repository";

interface CreateMealUseCaseResponse {
  meal: Meal;
}

export class CreateMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    name,
    isOnDiet,
    userId,
    description,
  }: CreateMealData): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create({
      name,
      isOnDiet,
      userId,
      description,
    });

    return { meal };
  }
}
