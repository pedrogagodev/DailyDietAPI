import type { MealsRepository } from "@/core/repositories/meals-repository";

interface getTotalMealsNumberUseCaseRequest {
  userId: string;
}

export class GetTotalMealsNumberUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
  }: getTotalMealsNumberUseCaseRequest): Promise<number> {
    const totalMealsNumber = await this.mealsRepository.countByUserId(userId);

    return totalMealsNumber;
  }
}
