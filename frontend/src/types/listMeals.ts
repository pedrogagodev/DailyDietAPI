export interface GetMealsResponse {
  meals: {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    isOnDiet: boolean;
    mealTime: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
