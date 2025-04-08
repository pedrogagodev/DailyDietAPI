import type { GetMealsResponse } from "@/types/listMeals";
import { httpClient } from "../httpClient";

export async function listMeals({ pageParam = 1, perPage = 20 }) {
  const { data } = await httpClient.get<GetMealsResponse>("/me/meals", {
    params: {
      pageParam,
      perPage,
    },
  });
  return data;
}
