import { HTTP_METHOD } from "shared/constants/httpMethod";
import { restApiClient } from "../restApiClient";

type RefreshTokensResponse = {
  accessToken: string;
  accessTokenExpiry: string;
  refreshToken: string;
};

export const refresh = (refreshToken: string) =>
  restApiClient<RefreshTokensResponse>("auth/refresh", {
    method: HTTP_METHOD.POST,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
