import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { UserNotFoundError } from "@/errors/user-not-found";

interface getMealsOnDietNumberUseCaseRequest {
  userId: string;
}

export class GetMealsOnDietNumberUseCase {
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
  }: getMealsOnDietNumberUseCaseRequest): Promise<number> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const totalMealsOnDietNumber =
      await this.mealsRepository.countOnDietByUserId(userId);

    return totalMealsOnDietNumber;
  }
}
