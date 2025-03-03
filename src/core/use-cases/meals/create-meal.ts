import type { Meal } from "@/core/entities/meal";
import type {
  MealsRepository,
  CreateMealData,
} from "@/core/repositories/meals-repository";

export class CreateMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async create(data: CreateMealData): Promise<Meal> {
    return this.mealsRepository.create(data);
  }
}
