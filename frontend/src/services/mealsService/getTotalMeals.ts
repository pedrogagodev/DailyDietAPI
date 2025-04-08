import { httpClient } from "../httpClient";
import type { GetTotalMeals } from "@/types/getTotalMeals";

export async function totalMeals() {
  const { data } = await httpClient.get<GetTotalMeals>("/me/meals/total");
  return data;
}
