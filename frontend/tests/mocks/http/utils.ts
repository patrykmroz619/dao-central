import { PUBLIC_CONFIG } from "@/infrastructure/config/public";

export const externalApi = (endpoint: string) => {
  let url = String(PUBLIC_CONFIG.API_URL);

  if (endpoint.startsWith("/")) {
    url += endpoint;
  } else {
    url += "/" + endpoint;
  }

  return url;
};
