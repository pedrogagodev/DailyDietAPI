import type { Meal } from "@/core/entities/meal";
import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { UserNotFoundError } from "@/errors/user-not-found";

interface ListMealsUseCaseRequest {
  userId: string;
  requestingUserId: string;
  page: number;
  limit: number;
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
    page,
    limit,
  }: ListMealsUseCaseRequest): Promise<ListMealsUseCaseResponse> {
    if (userId !== requestingUserId) {
      throw new UnauthorizedAccessError();
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const offset = (page - 1) * limit;

    const meals = await this.mealsRepository.listByUserId(userId, {
      limit,
      offset,
    });

    return { meals };
  }
}
