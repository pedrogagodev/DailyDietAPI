import type { CreateMealParams, CreateMealResponse } from "@/types/createMeal";
import { httpClient } from "../httpClient";

export async function createMeal(params: CreateMealParams) {
  const { data } = await httpClient.post<CreateMealResponse>(
    "/me/meals",
    params
  );
  return data;
}
