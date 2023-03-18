import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { restAPI } from "shared/api";
import { NFTData } from "shared/api/types/nftData.type";
import { getErrorMessage } from "modules/common/utils/getErrorMessage";

export const useUserNFTs = (chainId: number, collectionAddress: string) => {
  const [userNFTs, setUserNFTs] = useState<NFTData[]>([]);

  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchUserNFTs = async (accessToken: string) => {
    try {
      const nfts = await restAPI.nft.getUserNFTs(
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
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  return { userNFTs };
};
