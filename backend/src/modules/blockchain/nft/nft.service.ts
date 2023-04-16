import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/modules/users/infrastructure/entities/users.entity";
import { ExternalBlockchainApiService } from "../external-blockchain-api/external-blockchain-api.service";
import { GetUserTokensDto } from "./dto";

@Injectable()
export class NftService {
  constructor(
    private externalBlockchainApiService: ExternalBlockchainApiService,
  ) {}

  public async getUserTokens(
    user: UserEntity,
    chainId: number,
    collectionAddress?: string,
  ): Promise<GetUserTokensDto> {
    const nfts = await this.externalBlockchainApiService.getWalletNFTs(
      user.walletAddress,
      chainId,
      collectionAddress,
    );

    return {
      tokens: nfts,
    };
  }
}
