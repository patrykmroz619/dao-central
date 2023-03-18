import { useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { useSigner } from "wagmi";

import { useAsyncState } from "modules/common/hooks/useAsyncState";
import { getErrorMessage } from "modules/common/utils/getErrorMessage";
import { NFT_VOTING_CONTRACT_ABI } from "modules/dao/constants/nftVotingContractAbi";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

type CreateVotingFormData = {
  description: string;
  startDate: string;
  endDate: string;
};

export const useCreateVotingHandler = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVotingFormData>();

  const { setLoading, setError, setSuccess, state } = useAsyncState();
  const [txHash, setTxHash] = useState<string>();

  const { dao, registerNewProposal } = useDaoDetails();
  const { data: signer } = useSigner({
    chainId: dao.chainId,
  });

  const onSubmit = async (formData: CreateVotingFormData) => {
    const { description, startDate, endDate } = formData;
    try {
      if (!signer) {
        throw new Error("Wallet is not connected");
      }

      setLoading();

      const NFTVotingContract = new ethers.Contract(
        dao.contractAddress,
        NFT_VOTING_CONTRACT_ABI,
        signer
      );

      const startTimestampInSeconds = new Date(startDate).getTime() / 1000;
      const endTimestampInSeconds = new Date(endDate).getTime() / 1000;

      const { hash, wait } = await NFTVotingContract.addProposal(
        description,
        startTimestampInSeconds,
        endTimestampInSeconds
      );

      await wait();

      setTxHash(hash);

      registerNewProposal(description, new Date(startDate), new Date(endDate));
      setSuccess();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  return {
    creatingState: state,
    txHash,
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
};
