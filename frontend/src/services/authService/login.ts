import type { LoginParams, LoginResponse } from "@/types/login";
import { httpClient } from "../httpClient";

export async function login(params: LoginParams) {
  const { data } = await httpClient.post<LoginResponse>("/login", params);

  return data;
}
