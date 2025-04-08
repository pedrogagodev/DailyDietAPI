import type { GetMealsOffDiet } from "@/types/getMealsOffDiet";
import { httpClient } from "../httpClient";

export async function mealsOffDiet() {
  const { data } = await httpClient.get<GetMealsOffDiet>("/me/meals/off-diet");
  return data;
}
