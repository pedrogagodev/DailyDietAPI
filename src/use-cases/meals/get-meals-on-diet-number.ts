import type { MealsRepository } from "@/core/repositories/meals-repository";

interface getMealsOnDietNumberUseCaseRequest {
  userId: string;
}

export class getMealsOnDietNumberUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
  }: getMealsOnDietNumberUseCaseRequest): Promise<number> {
    const totalMealsOnDietNumber =
      await this.mealsRepository.countOnDietByUserId(userId);

    return totalMealsOnDietNumber;
  }
}
