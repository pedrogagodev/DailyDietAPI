import type { DeleteMealParams, DeleteMealResponse } from "@/types/deleteMeal";
import { httpClient } from "../httpClient";

export async function deleteMeal(params: DeleteMealParams) {
  const { data } = await httpClient.delete<DeleteMealResponse>(
    `/me/meals/${params.id}`
  );
  return data;
}
