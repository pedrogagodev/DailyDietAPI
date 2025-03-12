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
    const meal = this.items.find(
      meal => meal.userId === userId && meal.id === id
    );
    return Promise.resolve(meal || null);
  }
  listByUserId(userId: string): Promise<Meal[]> {
    const meals = this.items.filter(meal => meal.userId === userId);
    return Promise.resolve(meals);
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
  async delete(id: string): Promise<void> {
    const meal = await this.findById(id);

    if (!meal) {
      throw new Error("Meal not found");
    }

    this.items = this.items.filter(meal => meal.id !== id);
  }
  countByUserId(userId: string): Promise<number> {
    const totalMealsNumber = this.items.filter(
      meal => meal.userId === userId
    ).length;
    return Promise.resolve(totalMealsNumber);
  }
  countOnDietByUserId(userId: string): Promise<number> {
    const mealsOnDietNumber = this.items.filter(
      meal => meal.userId === userId && meal.isOnDiet
    ).length;
    return Promise.resolve(mealsOnDietNumber);
  }
  countOffDietByUserId(userId: string): Promise<number> {
    const mealsOffDietNumber = this.items.filter(
      meal => meal.userId === userId && !meal.isOnDiet
    ).length;
    return Promise.resolve(mealsOffDietNumber);
  }
  getLongestOnDietSequence(userId: string): Promise<number> {
    const longestOnDietSequence = this.items.reduce(
      (acc, meal) => {
        if (meal.userId !== userId) {
          return acc;
        }

        if (meal.isOnDiet) {
          acc.currentSequence += 1;
          acc.longestSequence = Math.max(
            acc.currentSequence,
            acc.longestSequence
          );
        } else {
          acc.currentSequence = 0;
        }
        return acc;
      },
      { currentSequence: 0, longestSequence: 0 }
    ).longestSequence;

    return Promise.resolve(longestOnDietSequence);
  }
}
