import { HTTP_METHOD } from "shared/constants/httpMethod";
import { restApiClient } from "../restApiClient";
import { NFTData } from "../types/nftData.type";

type GetUserNFTResponse = {
  tokens: NFTData[];
};

const getUserNFTs = async (
  accessToken: string,
  chainId: number,
  collectionAddress?: string
) => {
  const params = new URLSearchParams();

  params.set("chainId", chainId.toString());

  if (collectionAddress) {
    params.set("collectionAddress", collectionAddress);
  }

  const queryString = params.toString();

  const response = await restApiClient<GetUserNFTResponse>(
    `nft/user-tokens?${queryString}`,
    {
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.tokens;
};

export const nft = { getUserNFTs };
