import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { UserNotFoundError } from "@/errors/user-not-found";

interface getTotalMealsNumberUseCaseRequest {
  userId: string;
}

export class GetTotalMealsNumberUseCase {
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
  }: getTotalMealsNumberUseCaseRequest): Promise<number> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const totalMealsNumber = await this.mealsRepository.countByUserId(userId);

    return totalMealsNumber;
  }
}
