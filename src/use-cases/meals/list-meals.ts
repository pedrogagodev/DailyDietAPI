import type { Meal } from "@/core/entities/meal";
import type { MealsRepository } from "@/core/repositories/meals-repository";

interface ListMealsUseCaseRequest {
  userId: string;
}

interface ListMealsUseCaseResponse {
  meals: Meal[];
}

export class ListMealsUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
  }: ListMealsUseCaseRequest): Promise<ListMealsUseCaseResponse> {
    const meals = await this.mealsRepository.listByUserId(userId);

    return { meals };
  }
}
