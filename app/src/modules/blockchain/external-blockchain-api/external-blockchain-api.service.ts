import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Moralis from "moralis";
import { CONFIG } from "src/constants";
import { NFTData } from "./external-blockchain-api.type";

@Injectable()
export class ExternalBlockchainApiService implements OnApplicationBootstrap {
  constructor(private configService: ConfigService) {}

  public async onApplicationBootstrap() {
    const moralisApiKey = this.configService.get<string>(
      CONFIG.MORALIS_API_KEY,
    );

    await Moralis.start({
      apiKey: moralisApiKey,
    });
  }

  public async getWalletNFTs(
    walletAddress: string,
    chainId: number,
    collectionAddress?: string,
  ): Promise<NFTData[]> {
    const nfts: NFTData[] = [];

    let cursor: string | null = null;

    while (true) {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        cursor,
        address: walletAddress,
        chain: chainId,
        tokenAddresses: collectionAddress ? [collectionAddress] : undefined,
      });

      cursor = response.pagination.cursor;

      const fetchedNfts = response.result.map((nft) => ({
        nftId: Number(nft.tokenId),
        collectionAddress: nft.tokenAddress.lowercase,
      }));

      nfts.push(...fetchedNfts);

      if (!response.hasNext) {
        break;
      }
    }

    return nfts;
  }
}
