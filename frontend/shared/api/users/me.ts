import { restApiClient } from "shared/api/restApiClient";
import { HTTP_METHOD } from "shared/constants/httpMethod";

type MeResponse = {
  id: string;
  walletAddress: string;
  createdAt: string;
};

export const me = (accessToken: string) =>
  restApiClient<MeResponse>("users/me", {
    method: HTTP_METHOD.GET,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
