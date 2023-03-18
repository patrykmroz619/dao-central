import { HttpService } from "modules/common/services/httpService";
import { PUBLIC_CONFIG } from "modules/config/public";

export class UserService {
  constructor(
    private api: HttpService = new HttpService(PUBLIC_CONFIG.API_URL)
  ) {}

  public async getLoggedUser(accessToken: string) {
    type MeResponse = {
      id: string;
      walletAddress: string;
      createdAt: string;
    };

    const { data } = await this.api.get<MeResponse>("users/me", {
      bearerToken: accessToken,
    });

    return data;
  }
}
