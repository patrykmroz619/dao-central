import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useContract, useProvider } from "wagmi";

import { getErrorMessage } from "modules/common/utils/getErrorMessage";
import { useUserNFTs } from "modules/blockchain/hooks/useUserNFTs";
import { DaoData } from "modules/dao/types/daoData.type";
import { NFT_VOTING_CONTRACT_ABI } from "modules/dao/constants/nftVotingContractAbi";

type ProposalData = {
  id: number;
  description: string;
  startTime: Date;
  endTime: Date;
  approvals: number;
  denials: number;
};

export const useDaoDetailsData = (dao: DaoData) => {
  const [proposalsCount, setProposalsCount] = useState(0);
  const [proposals, setProposals] = useState<ProposalData[]>([]);
  const [fetchingProposalsError, setFetchingProposalsError] =
    useState<string>();

  const { userNFTs } = useUserNFTs(dao.chainId, dao.nftAddress);

  const provider = useProvider({
    chainId: dao.chainId,
  });
  const VotingContract = useContract({
    address: dao.contractAddress,
    abi: NFT_VOTING_CONTRACT_ABI,
    signerOrProvider: provider,
  });

  const fetchProposalsCount = async () => {
    if (VotingContract) {
      const proposalsCount = Number(await VotingContract.proposalsCount());
      setProposalsCount(proposalsCount);
      return proposalsCount;
    }

    return 0;
  };

  const fetchProposalsData = async (proposalsCount: number) => {
    if (VotingContract) {
      for (let i = proposalsCount; i > 0; i--) {
        const response = await VotingContract.proposals(i);

        const proposal: ProposalData = {
          id: Number(response.id),
          description: response.description,
          startTime: new Date(response.startTime.mul(1000).toNumber()),
          endTime: new Date(response.endTime.mul(1000).toNumber()),
          approvals: Number(response.approvals),
          denials: Number(response.denials),
        };

        setProposals((prev) => [...prev, proposal]);
      }
    }
  };

  const fetchData = async () => {
    try {
      const proposalsCount = await fetchProposalsCount();

      await fetchProposalsData(proposalsCount);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setFetchingProposalsError(errorMessage);
    }
  };

  const registerNewProposal = async (
    description: string,
    startTime: Date,
    endTime: Date
  ) => {
    const newProposal: ProposalData = {
      id: proposalsCount + 1,
      description,
      startTime,
      endTime,
      approvals: 0,
      denials: 0,
    };

    setProposals((prev) => [newProposal, ...prev]);
    setProposalsCount(proposalsCount + 1);
  };

  const updateProposalData = async (proposalId: number) => {
    if (VotingContract) {
      try {
        const response = await VotingContract.proposals(proposalId);

        const updatedProposal: ProposalData = {
          id: Number(response.id),
          description: response.description,
          startTime: new Date(response.startTime.mul(1000).toNumber()),
          endTime: new Date(response.endTime.mul(1000).toNumber()),
          approvals: Number(response.approvals),
          denials: Number(response.denials),
        };

        setProposals((proposals) =>
          proposals.map((proposal) =>
            proposal.id === proposalId ? updatedProposal : proposal
          )
        );
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        toast.error(`Failed to update proposal data: ${errorMessage}`);
      }
    }
  };

  useEffect(() => {
    if (VotingContract) {
      console.log("FETCHING");
      fetchData();
    }
  }, []);

  return {
    proposalsCount,
    proposals,
    fetchingProposalsError,
    registerNewProposal,
    updateProposalData,
    dao,
    userNFTs,
  };
};
