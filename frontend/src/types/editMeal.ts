export interface EditMealParams {
  name?: string;
  description?: string;
  isOnDiet?: boolean;
  id: string;
  mealTime?: string;
}
export interface EditMealResponse {
  meal: {
    id: string;
    name: string;
    description: string | null;
    isOnDiet: boolean;
    date_time: string;
    created_at: string;
    updated_at: string;
  };
}
