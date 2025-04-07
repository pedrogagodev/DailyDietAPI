import type { GetSequenceResponse } from "@/types/getSequence";
import { httpClient } from "../httpClient";

export async function getSequence() {
  const { data } = await httpClient.get<GetSequenceResponse>(
    "/me/meals/longest-on-diet-sequence"
  );
  return data;
}
