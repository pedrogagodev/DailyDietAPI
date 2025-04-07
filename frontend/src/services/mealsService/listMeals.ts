import type { GetMealsResponse } from "@/types/listMeals";
import { httpClient } from "../httpClient";

export async function listMeals() {
  const { data } = await httpClient.get<GetMealsResponse>("/me/meals");
  return data;
}
