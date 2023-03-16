import { useEffect, useState } from "react";
import { useContract, useProvider } from "wagmi";

import { DaoData } from "shared/api/types/daoData.type";
import { nftVotingContractConfig } from "shared/features/contracts";
import { getErrorMessage } from "shared/utils/getErrorMessage";
import { useUserNFTs } from "./useUserNFTs";

type ProposalData = {
  id: number;
  description: string;
  startTime: Date;
  endTime: Date;
  approvals: number;
  denials: number;
};

export const useDaoPageData = (dao: DaoData) => {
  const [proposalsCount, setProposalsCount] = useState(0);
  const [proposals, setProposals] = useState<ProposalData[]>([]);
  const [fetchingProposalsError, setFetchingProposalsError] =
    useState<string>();

  const { userNFTs } = useUserNFTs(dao.chainId, dao.nftAddress);

  const provider = useProvider({
    chainId: dao.chainId,
  });
  const VotingContract = useContract({
    ...nftVotingContractConfig(dao.contractAddress),
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
    dao,
    userNFTs,
  };
};
