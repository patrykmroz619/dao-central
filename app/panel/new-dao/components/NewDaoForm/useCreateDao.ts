import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSigner } from "wagmi";
import { Contract, ethers } from "ethers";
import * as yup from "yup";

import { YupShape } from "shared/types/yup-schema";
import { walletAddressValidation } from "shared/utils/walletAddressValidation";
import { getErrorMessage } from "shared/utils/getErrorMessage";
import { useAsyncState } from "shared/hooks/useAsyncState";
import { nftVotingFactoryContractConfig } from "shared/features/contracts";

type CreateDaoFormData = {
  organizationName: string;
  nftAddress: string;
};

const createDaoFormSchema = yup.object().shape<YupShape<CreateDaoFormData>>({
  organizationName: yup.string().required("Organization name is required."),
  nftAddress: yup.string().test(walletAddressValidation),
});

const defaultValues: CreateDaoFormData = {
  organizationName: "",
  nftAddress: "",
};

export const useCreateDao = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDaoFormData>({
    resolver: yupResolver(createDaoFormSchema),
    defaultValues,
  });

  const { data: signer } = useSigner();

  const {
    state: creatingDaoState,
    setLoading,
    setError,
    setSuccess,
  } = useAsyncState();
  const [txHash, setTxHash] = useState<string>();

  const createDao = async (formData: CreateDaoFormData) => {
    const { organizationName, nftAddress } = formData;
    setLoading();

    try {
      if (!signer) {
        throw new Error("Wallet is not connected");
      }

      const { address, abi } = nftVotingFactoryContractConfig;
      const NFTVotingFactoryContract = new Contract(address, abi, signer);

      const deployParams = ethers.utils.defaultAbiCoder.encode(
        ["string", "address"],
        [organizationName, nftAddress]
      );

      const { wait, hash } = await NFTVotingFactoryContract.deployContract(
        deployParams
      );

      setTxHash(hash);

      await wait(1);

      setSuccess();
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e, "Creating DAO contract failed!");
      setError(errorMessage);
    }
  };

  return {
    register,
    handleCreateDaoSubmit: handleSubmit(createDao),
    formErrors: errors,
    creatingDaoState,
    txHash,
  };
};
