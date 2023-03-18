import { HttpService } from "modules/common/services/httpService";
import { PUBLIC_CONFIG } from "modules/core/config/public";
import { NFTData } from "../types/nftData.type";

export class NFTService {
  constructor(
    private api: HttpService = new HttpService(PUBLIC_CONFIG.API_URL)
  ) {}

  public async getNFTsOfUser(
    accessToken: string,
    chainId: number,
    collectionAddress?: string
  ) {
    type GetUserNFTResponse = {
      tokens: NFTData[];
    };

    const response = await this.api.get<GetUserNFTResponse>("nft/user-tokens", {
      params: {
        chainId,
        collectionAddress,
      },
      bearerToken: accessToken,
    });

    return response.data.tokens;
  }
}
