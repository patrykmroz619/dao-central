import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { toast } from "react-toastify";

import { getErrorMessage } from "@/infrastructure/helpers/utils/getErrorMessage";
import { NFT_VOTING_CONTRACT_ABI } from "modules/dao/constants/nftVotingContractAbi";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

enum VOTE {
  NO_VOTE,
  APPROVAL,
  DENIAL,
}

export const useVotingHandler = (proposalId: number) => {
  const { data: signer } = useSigner();

  const { dao, userNFTs, updateProposalData } = useDaoDetails();

  const handleVote = async (approve: boolean) => {
    try {
      if (!signer) {
        throw new Error("Wallet is not connected");
      }

      const NFTVotingContract = new ethers.Contract(
        dao.contractAddress,
        NFT_VOTING_CONTRACT_ABI,
        signer
      );

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
