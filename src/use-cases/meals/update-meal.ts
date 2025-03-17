import type { Meal } from "@/core/entities/meal";
import type {
  MealsRepository,
  UpdateMealData,
} from "@/core/repositories/meals-repository";
import { MealNotFoundError } from "@/errors/meal-not-found";

interface UpdateMealUseCaseRequest {
  id: string;
  data: UpdateMealData;
}

interface UpdateMealUseCaseResponse {
  meal: Meal;
}

export class UpdateMealUseCase {
  private mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute({
    id,
    data,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const checkIfMealExists = await this.mealsRepository.findById(id);
    
    if (!checkIfMealExists) {
      throw new MealNotFoundError();
    }
    const meal = await this.mealsRepository.update(id, data);

    return { meal };
  }
}
