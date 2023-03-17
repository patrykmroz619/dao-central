import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNetwork, useSigner } from "wagmi";
import { ethers } from "ethers";
import * as yup from "yup";

import { YupShape } from "shared/types/yup-schema";
import { walletAddressValidation } from "shared/utils/walletAddressValidation";
import { getErrorMessage } from "shared/utils/getErrorMessage";
import { useAsyncState } from "shared/hooks/useAsyncState";
import { nftVotingFactoryContractConfig } from "shared/features/contracts";
import { restAPI } from "shared/api";

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
  const { chain } = useNetwork();
  const { data: sessionData } = useSession();
  const router = useRouter();

  const {
    state: creatingDaoState,
    setLoading,
    setError,
    setSuccess,
  } = useAsyncState();
  const [txHash, setTxHash] = useState<string>();

  const createDao = async (formData: CreateDaoFormData) => {
    if (!sessionData) {
      router.replace("/login");
      return;
    }

    const { organizationName, nftAddress } = formData;
    setLoading();

    try {
      if (!signer || !chain) {
        throw new Error("Wallet is not connected");
      }

      const { address, abi } = nftVotingFactoryContractConfig;
      const NFTVotingFactoryContract = new ethers.Contract(
        address,
        abi,
        signer
      );

      const deployParams = ethers.utils.defaultAbiCoder.encode(
        ["string", "address"],
        [organizationName, nftAddress]
      );

      const { wait, hash } = await NFTVotingFactoryContract.deployContract(
        deployParams
      );

      setTxHash(hash);

      const { logs } = await wait(1);

      const NFTVotingFactoryInterface = new ethers.utils.Interface(abi);

      let createdContractAddress: string | null = null;

      for (const log of logs) {
        try {
          const parsedLog = NFTVotingFactoryInterface.parseLog(log);
          console.log({ log, parsedLog });
          if (parsedLog.name === "ContractCreated") {
            createdContractAddress = parsedLog.args.contractAddress;
            break;
          }
        } catch {
          continue;
        }
      }

      if (createdContractAddress) {
        const newDao = await restAPI.dao.save(
          chain.id,
          createdContractAddress,
          sessionData.accessToken
        );
        router.replace(`panel/dao/${newDao.id}`);
      } else {
        router.replace(`panel/my-dao`);
      }

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