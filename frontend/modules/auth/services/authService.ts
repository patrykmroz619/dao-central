import { HttpService } from "modules/common/services/httpService/httpService";
import { PUBLIC_CONFIG } from "modules/core/config/public";

export class AuthService {
  constructor(
    private api: HttpService = new HttpService(PUBLIC_CONFIG.API_URL)
  ) {}

  public async getMessageToSignToLoginByWallet(walletAddress: string) {
    type GetMessageToSignResponse = {
      message: string;
    };

    const {
      data: { message },
    } = await this.api.get<GetMessageToSignResponse>("auth/login", {
      params: {
        walletAddress,
      },
    });

    return message;
  }

  public async loginByWallet(walletAddress: string, signature: string) {
    type GetLoginByWalletResponse = {
      accessToken: string;
      accessTokenExpiry: string;
      refreshToken: string;
    };

    const { data } = await this.api.post<GetLoginByWalletResponse>(
      "auth/login",
      { walletAddress, signature }
    );

    return data;
  }

  public async refreshAccessToken(refreshToken: string) {
    type RefreshTokensResponse = {
      accessToken: string;
      accessTokenExpiry: string;
      refreshToken: string;
    };

    const { data } = await this.api.post<RefreshTokensResponse>(
      "auth/refresh",
      undefined,
      {
        bearerToken: refreshToken,
      }
    );

    return data;
  }
}
