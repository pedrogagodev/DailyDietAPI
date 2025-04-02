export interface Meal {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  dateTime: Date;
  isOnDiet: boolean;
  createdAt: Date;
  updatedAt: Date;
}
