import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { erc721ContractConfig } from "shared/features/contracts";
import { getErrorMessage } from "shared/utils/getErrorMessage";
import { useAccount, useProvider } from "wagmi";
import { useDaoPageContext } from "../../../context";

export const useCheckNFTOnWallet = () => {
  const { dao } = useDaoPageContext();

  const { address } = useAccount();
  const provider = useProvider({
    chainId: dao.chainId,
  });

  const [hasUserNFTs, setHasUserNFTs] = useState<boolean>();

  const checkNFTOnWallet = async (userAddress: string) => {
    try {
      const { address, abi } = erc721ContractConfig(dao.nftAddress);
      const ERC721Contract = new ethers.Contract(address, abi, provider);

      const userBalanceOfNFTs = Number(
        await ERC721Contract.balanceOf(userAddress)
      );

      setHasUserNFTs(userBalanceOfNFTs > 0);
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      setHasUserNFTs(false);
    }
  };

  useEffect(() => {
    if (address) {
      checkNFTOnWallet(address);
    }
  }, [address]);

  return { hasUserNFTs };
};
