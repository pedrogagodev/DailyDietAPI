import { env } from "@/utils/env";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
});

httpClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("@DailyDiet:token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
