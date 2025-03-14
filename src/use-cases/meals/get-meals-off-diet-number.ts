import type { MealsRepository } from "@/core/repositories/meals-repository";

interface getMealsOffDietNumberUseCaseRequest {
  userId: string;
}

export class GetMealsOffDietNumberUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
  }: getMealsOffDietNumberUseCaseRequest): Promise<number> {
    const totalMealsOffDietNumber =
      await this.mealsRepository.countOffDietByUserId(userId);

    return totalMealsOffDietNumber;
  }
}
