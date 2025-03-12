import type { MealsRepository } from "@/core/repositories/meals-repository";

interface getLongestOnDietSequenceUseCaseRequest {
  userId: string;
}

export class getLongestOnDietSequenceUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    userId,
  }: getLongestOnDietSequenceUseCaseRequest): Promise<number> {
    const longestOnDietSequence =
      await this.mealsRepository.getLongestOnDietSequence(userId);

    return longestOnDietSequence;
  }
}
