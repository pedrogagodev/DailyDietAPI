import { httpClient } from "../httpClient";

export interface meResponse {
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

export async function me() {
  const { data } = await httpClient.get<meResponse>("/me");
  return data;
}
