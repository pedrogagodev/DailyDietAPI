import type { Meal } from "../entities/meal";

export interface CreateMealData {
  userId: string;
  mealTime: string;
  requestingUserId: string;
  name: string;
  description?: string | null;
  isOnDiet: boolean;
}

export interface UpdateMealData {
  name?: string;
  description?: string | null;
  mealTime?: string;
  isOnDiet?: boolean;
}

export interface MealsRepository {
  create(data: CreateMealData): Promise<Meal>;
  findById(id: string): Promise<Meal | null>;
  findByUserIdAndId(userId: string, id: string): Promise<Meal | null>;
  listByUserId(userId: string): Promise<Meal[]>;
  update(id: string, data: UpdateMealData): Promise<Meal>;
  delete(id: string): Promise<void>;
  countByUserId(userId: string): Promise<number>;
  countOnDietByUserId(userId: string): Promise<number>;
  countOffDietByUserId(userId: string): Promise<number>;
  getLongestOnDietSequence(userId: string): Promise<number>;
}
