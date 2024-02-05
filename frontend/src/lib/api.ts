import { getEnv } from "./env";

export const FetchAPI = (endpoint: string, args?: RequestInit) =>
  fetch(
    `${getEnv("VITE_API_URL")}${
      endpoint.startsWith("/") ? endpoint : "/" + endpoint.trim()
    }`,
    args
  );
