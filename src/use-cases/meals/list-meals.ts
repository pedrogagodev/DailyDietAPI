import type { Meal } from "@/core/entities/meal";
import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { UserNotFoundError } from "@/errors/user-not-found";

interface ListMealsUseCaseRequest {
  userId: string;
  requestingUserId: string;
}

interface ListMealsUseCaseResponse {
  meals: Meal[];
}

export class ListMealsUseCase {
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
  }: ListMealsUseCaseRequest): Promise<ListMealsUseCaseResponse> {
    if (userId !== requestingUserId) {
      throw new UnauthorizedAccessError();
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }


    const meals = await this.mealsRepository.listByUserId(userId);

    return { meals };
  }
}
