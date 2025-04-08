import type { Meal } from "@/core/entities/meal";
import type {
  CreateMealData,
  MealsRepository,
} from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { UserNotFoundError } from "@/errors/user-not-found";
interface CreateMealUseCaseResponse {
  meal: Meal;
}

export class CreateMealUseCase {
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
    name,
    mealTime,
    isOnDiet,
    userId,
    description,
    requestingUserId,
  }: CreateMealData): Promise<CreateMealUseCaseResponse> {
    if (!userId) {
      throw new UserNotFoundError();
    }

    if (requestingUserId !== userId) {
      throw new UnauthorizedAccessError();
    }

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    const meal = await this.mealsRepository.create({
      name,
      isOnDiet,
      mealTime,
      userId,
      description,
      requestingUserId,
    });

    return { meal };
  }
}
