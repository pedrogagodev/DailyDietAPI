export interface GetMealsResponse {
  meals: {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    isOnDiet: boolean;
    mealTime: string;
    created_at: string;
    updated_at: string;
  }[];
}
