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
    throw new Error("Method not implemented.");
  }
  findByUserIdAndId(userId: string, id: string): Promise<Meal | null> {
    throw new Error("Method not implemented.");
  }
  listByUserId(userId: string): Promise<Meal[]> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: UpdateMealData): Promise<Meal> {
    throw new Error("Method not implemented.");
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
