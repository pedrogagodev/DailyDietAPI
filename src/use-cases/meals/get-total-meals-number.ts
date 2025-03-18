import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { UserNotFoundError } from "@/errors/user-not-found";

interface getTotalMealsNumberUseCaseRequest {
  userId: string;
  requestingUserId: string;
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
    requestingUserId,
  }: getTotalMealsNumberUseCaseRequest): Promise<number> {
    if (userId !== requestingUserId) {
      throw new UnauthorizedAccessError();
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const totalMealsNumber = await this.mealsRepository.countByUserId(userId);

    return totalMealsNumber;
  }
}
