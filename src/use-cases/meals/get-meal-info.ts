import type { Meal } from "@/core/entities/meal";
import type { MealsRepository } from "@/core/repositories/meals-repository";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { MealNotFoundError } from "@/errors/meal-not-found";
import { UserNotFoundError } from "@/errors/user-not-found";

interface GetMealInfoUseCaseRequest {
  userId: string;
  id: string;
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
    id,
  }: GetMealInfoUseCaseRequest): Promise<GetMealInfoUseCaseResponse> {
    
    const checkIfUserExists = await this.usersRepository.findById(userId);

    if (!checkIfUserExists) {
      throw new UserNotFoundError();
    }
    
    
    const meal = await this.mealsRepository.findByUserIdAndId(userId, id);
    
    if (!meal) {
      throw new MealNotFoundError();
    }


    return { meal };
  }
}
