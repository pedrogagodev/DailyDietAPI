export interface CreateMealParams {
  name: string;
  description?: string;
  isOnDiet: boolean;
}

export interface CreateMealResponse {
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
