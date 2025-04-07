export interface Meal {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  mealTime: string;
  isOnDiet: boolean;
  createdAt: Date;
  updatedAt: Date;
}
