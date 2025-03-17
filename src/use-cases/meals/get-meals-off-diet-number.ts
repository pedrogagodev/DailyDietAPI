import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { UserNotFoundError } from "@/errors/user-not-found";

interface getMealsOffDietNumberUseCaseRequest {
  userId: string;
}

export class GetMealsOffDietNumberUseCase {
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
  }: getMealsOffDietNumberUseCaseRequest): Promise<number> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const totalMealsOffDietNumber =
      await this.mealsRepository.countOffDietByUserId(userId);

    return totalMealsOffDietNumber;
  }
}
