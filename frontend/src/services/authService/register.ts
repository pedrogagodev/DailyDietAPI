import type { RegisterParams } from "@/types/register";
import { httpClient } from "../httpClient";

export async function register(params: RegisterParams) {
  const { data } = await httpClient.post("/register", params);

  return data;
}
