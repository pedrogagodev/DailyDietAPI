import type { MealsRepository } from "@/core/repositories/meals-repository";
import { MealNotFoundError } from "@/errors/meal-not-found";

interface DeleteMealUseCaseRequest {
  id: string;
}

export class DeleteMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({ id }: DeleteMealUseCaseRequest): Promise<void> {
    const checkIfMealExists = await this.mealsRepository.findById(id);
    if (!checkIfMealExists) {
      throw new MealNotFoundError();
    }

    this.mealsRepository.delete(id);
  }
}
