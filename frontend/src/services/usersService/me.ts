import type { meResponse } from "@/types/me";
import { httpClient } from "../httpClient";

export async function me() {
  const { data } = await httpClient.get<meResponse>("/me");
  return data;
}
