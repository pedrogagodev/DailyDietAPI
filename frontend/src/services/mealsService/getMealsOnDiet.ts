import type { GetMealsOnDiet } from "@/types/getMealsOnDiet";
import { httpClient } from "../httpClient";

export async function mealsOnDiet() {
  const { data } = await httpClient.get<GetMealsOnDiet>("/me/meals/on-diet");
  return data;
}
