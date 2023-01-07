import { restApiClient } from "shared/api/restApiClient";
import { HTTP_METHOD } from "shared/constants/httpMethod";

type GetMessageToSignResponse = {
  message: string;
};

const getMessageToSign = (walletAddress: string) =>
  restApiClient<GetMessageToSignResponse>(
    `auth/login?walletAddress=${walletAddress}`,
    {
      method: HTTP_METHOD.GET,
    }
  );

type GetLoginByWalletResponse = {
  accessToken: string;
  accessTokenExpiry: string;
  refreshToken: string;
};

const loginByWallet = (walletAddress: string, signature: string) =>
  restApiClient<GetLoginByWalletResponse>("auth/login", {
    method: HTTP_METHOD.POST,
    body: JSON.stringify({
      walletAddress,
      signature,
    }),
  });

export const login = {
  getMessageToSign,
  loginByWallet,
};
