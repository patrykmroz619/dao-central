"use client";

import { PUBLIC_CONFIG } from "modules/core/config/public";

if (PUBLIC_CONFIG.MOCKS_ENABLED) {
  require("./utils/initHttpMocks");
}

export const RegisterHttpClientMocks = () => {
  return null;
};
