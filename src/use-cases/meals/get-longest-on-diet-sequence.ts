import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { UserNotFoundError } from "@/errors/user-not-found";

interface getLongestOnDietSequenceUseCaseRequest {
  userId: string;
}

export class GetLongestOnDietSequenceUseCase {
  private mealsRepository: MealsRepository;
  private usersRepository: UsersRepository;

  constructor(
    mealsRepository: MealsRepository,
    usersRepository: UsersRepository
  ) {
    this.mealsRepository = mealsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    userId,
  }: getLongestOnDietSequenceUseCaseRequest): Promise<number> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const longestOnDietSequence =
      await this.mealsRepository.getLongestOnDietSequence(userId);

    return longestOnDietSequence;
  }
}
