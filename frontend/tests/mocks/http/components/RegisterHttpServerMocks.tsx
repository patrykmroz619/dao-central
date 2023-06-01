import { PUBLIC_CONFIG } from "@/infrastructure/config/public";

if (PUBLIC_CONFIG.MOCKS_ENABLED) {
  require("./utils/initHttpMocks");
}

export const RegisterHttpServerMocks = () => {
  return null;
};
