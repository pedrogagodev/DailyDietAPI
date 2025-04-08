import type { Meal } from "@/core/entities/meal";
import type {
  MealsRepository,
  UpdateMealData,
} from "@/core/repositories/meals-repository";
import { MealNotFoundError } from "@/errors/meal-not-found";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";

interface UpdateMealUseCaseRequest {
  id: string;
  data: UpdateMealData;
  requestingUserId: string;
}

interface UpdateMealUseCaseResponse {
  updatedMeal: Meal;
}

export class UpdateMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    id,
    data,
    requestingUserId,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(id);

    if (!meal) {
      throw new MealNotFoundError();
    }

    if (meal.userId !== requestingUserId) {
      throw new UnauthorizedAccessError();
    }

    if (data.mealTime && data.mealTime.length === 5) {
      data.mealTime = `${data.mealTime}:00`;
    }

    if (data.mealTime === null) {
      data.mealTime = "00:00:00";
    }

    const updatedMeal = await this.mealsRepository.update(id, data);

    return { updatedMeal };
  }
}
