"use client";

import { PUBLIC_CONFIG } from "@/infrastructure/config/public";

if (PUBLIC_CONFIG.MOCKS_ENABLED) {
  import("./utils/initHttpMocks");
}

export const RegisterHttpClientMocks = () => {
  return null;
};
