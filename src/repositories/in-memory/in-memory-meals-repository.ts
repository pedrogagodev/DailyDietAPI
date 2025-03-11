import type { Meal } from "@/core/entities/meal";
import type {
  CreateMealData,
  MealsRepository,
  UpdateMealData,
} from "@/core/repositories/meals-repository";

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = [];

  async create(data: CreateMealData): Promise<Meal> {
    const meal = {
      id: "meal-1",
      name: data.name,
      dateTime: new Date(),
      description: data.description || null,
      isOnDiet: data.isOnDiet,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(meal);

    return Promise.resolve(meal);
  }

  findById(id: string): Promise<Meal | null> {
    const meal = this.items.find(meal => meal.id === id);
    return Promise.resolve(meal || null);
  }
  findByUserIdAndId(userId: string, id: string): Promise<Meal | null> {
    throw new Error("Method not implemented.");
  }
  listByUserId(userId: string): Promise<Meal[]> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, data: UpdateMealData): Promise<Meal> {
    let meal = await this.findById(id);
    if (!meal) {
      throw new Error("Meal not found");
    }
    meal = {
      ...meal,
      name: data.name ?? meal.name,
      description: data.description ?? meal.description,
      isOnDiet: data.isOnDiet ?? meal.isOnDiet,
      updatedAt: new Date(),
    };
    return Promise.resolve(meal);
  }
  delete(id: string): void {
    throw new Error("Method not implemented.");
  }
  countByUserId(userId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  countOnDietByUserId(userId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  countOffDietByUserId(userId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  getLongestOnDietSequence(userId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
}
