import type { MealsRepository } from "@/core/repositories/meals-repository";
import { InvalidMealDataError } from "@/errors/invalid-meal-data-error";
import { MealNotFoundError } from "@/errors/meal-not-found";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";

interface DeleteMealUseCaseRequest {
  id: string;
  requestingUserId: string;
}

export class DeleteMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    id,
    requestingUserId,
  }: DeleteMealUseCaseRequest): Promise<void> {
    if (!id) {
      throw new InvalidMealDataError();
    }
    const checkIfMealExists = await this.mealsRepository.findById(id);
    if (!checkIfMealExists) {
      throw new MealNotFoundError();
    }

    if (checkIfMealExists.userId !== requestingUserId) {
      throw new UnauthorizedAccessError();
    }

    await this.mealsRepository.delete(id);
  }
}
