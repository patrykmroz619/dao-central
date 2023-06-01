import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { getErrorMessage } from "@/infrastructure/helpers/utils/getErrorMessage";
import { NFTData } from "modules/blockchain/types/nftData.type";
import { useNFTService } from "./useNFTService";

export const useUserNFTs = (chainId: number, collectionAddress: string) => {
  const [userNFTs, setUserNFTs] = useState<NFTData[]>([]);

  const { data: session, status } = useSession();
  const nftService = useNFTService();

  const fetchUserNFTs = async (accessToken: string) => {
    try {
      const nfts = await nftService.getNFTsOfUser(
        accessToken,
        chainId,
        collectionAddress
      );
      setUserNFTs(nfts);
    } catch (error: unknown) {
      toast.error(
        `Error while fetching NFTs of user: ${getErrorMessage(error)}`
      );
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserNFTs(session.accessToken);
    }
  }, [status]);

  return { userNFTs };
};
