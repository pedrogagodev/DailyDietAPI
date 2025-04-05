import type { Meal } from "@/core/entities/meal";
import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { MealNotFoundError } from "@/errors/meal-not-found";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { UserNotFoundError } from "@/errors/user-not-found";

interface GetMealInfoUseCaseRequest {
  userId: string;
  mealId: string;
  requestingUserId: string;
}

interface GetMealInfoUseCaseResponse {
  meal: Meal;
}

export class GetMealInfoUseCase {
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
    mealId,
    requestingUserId,
  }: GetMealInfoUseCaseRequest): Promise<GetMealInfoUseCaseResponse> {

    if (requestingUserId !== userId) {
      throw new UnauthorizedAccessError();
    }
    
    const checkIfUserExists = await this.usersRepository.findById(userId);

    if (!checkIfUserExists) {
      throw new UserNotFoundError();
    }
    
    const meal = await this.mealsRepository.findByUserIdAndId(userId, mealId);
    
    if (!meal) {
      throw new MealNotFoundError();
    }


    return { meal };
  }
}
