import type { EditMealParams, EditMealResponse } from "@/types/editMeal";
import { httpClient } from "../httpClient";

export async function editMeal(params: EditMealParams) {
  const { data } = await httpClient.put<EditMealResponse>(
    `/me/meals/${params.id}`,
    params
  );
  return data;
}
