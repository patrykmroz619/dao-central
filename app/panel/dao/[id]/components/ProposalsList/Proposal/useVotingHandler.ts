import { ethers } from "ethers";
import { toast } from "react-toastify/dist/core";
import { nftVotingContractConfig } from "shared/features/contracts";
import { getErrorMessage } from "shared/utils/getErrorMessage";
import { useSigner } from "wagmi";
import { useDaoPageContext } from "../../../context";

enum VOTE {
  NO_VOTE,
  APPROVAL,
  DENIAL,
}

export const useVotingHandler = (proposalId: number) => {
  const { data: signer } = useSigner();

  const { dao, userNFTs, updateProposalData } = useDaoPageContext();

  const handleVote = async (approve: boolean) => {
    try {
      if (!signer) {
        throw new Error("Wallet is not connected");
      }
      const { address, abi } = nftVotingContractConfig(dao.contractAddress);

      const NFTVotingContract = new ethers.Contract(address, abi, signer);

      const vote = approve ? VOTE.APPROVAL : VOTE.DENIAL;

      const nftsId = userNFTs.map((nft) => nft.nftId);

      const { wait } = await NFTVotingContract.castVote(
        proposalId,
        vote,
        nftsId
      );

      await wait();
      await updateProposalData(proposalId);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return {
    handleVote,
  };
};
