import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNetwork, useSigner } from "wagmi";
import { ethers } from "ethers";
import * as yup from "yup";

import { YupShape } from "modules/common/types/yup-schema";
import { getErrorMessage } from "modules/common/utils/getErrorMessage";
import { useAsyncState } from "modules/common/hooks/useAsyncState";
import { walletAddressValidation } from "modules/blockchain/utils/walletAddressValidation";
import { useDaoService } from "modules/dao/hooks/useDaoService";
import { PUBLIC_CONFIG } from "modules/core/config/public";
import { NFT_VOTING_FACTORY_CONTRACT_ABI } from "modules/dao/constants/nftVotingFactoryContractAbi";
import { DAO_EXTRA_LINKS_TYPES } from "modules/dao/constants/daoExtraLinksTypes";

type CreateDaoFormData = {
  organizationName: string;
  nftAddress: string;
  description: string;
  websiteLink: string;
  facebookLink: string;
  twitterLink: string;
  discordLink: string;
};

const createDaoFormSchema = yup.object().shape<YupShape<CreateDaoFormData>>({
  organizationName: yup.string().required("Organization name is required."),
  nftAddress: yup.string().test(walletAddressValidation),
  description: yup.string(),
  websiteLink: yup.string(),
  facebookLink: yup.string(),
  twitterLink: yup.string(),
  discordLink: yup.string(),
});

const defaultValues: CreateDaoFormData = {
  organizationName: "",
  nftAddress: "",
  description: "",
  websiteLink: "",
  facebookLink: "",
  twitterLink: "",
  discordLink: "",
};

export const useCreateDao = () => {
  const {
    register,
    control,
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
  const daoService = useDaoService();

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

    const {
      organizationName,
      nftAddress,
      description,
      discordLink,
      facebookLink,
      twitterLink,
      websiteLink,
    } = formData;
    setLoading();

    try {
      if (!signer || !chain) {
        throw new Error("Wallet is not connected");
      }

      const NFTVotingFactoryContract = new ethers.Contract(
        PUBLIC_CONFIG.CONTRACTS.NFT_VOTING_FACTORY_ADDRESS,
        NFT_VOTING_FACTORY_CONTRACT_ABI,
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

      const NFTVotingFactoryInterface = new ethers.utils.Interface(
        NFT_VOTING_FACTORY_CONTRACT_ABI
      );

      let createdContractAddress: string | null = null;

      for (const log of logs) {
        try {
          const parsedLog = NFTVotingFactoryInterface.parseLog(log);
          if (parsedLog.name === "ContractCreated") {
            createdContractAddress = parsedLog.args.contractAddress;
            break;
          }
        } catch {
          continue;
        }
      }

      if (createdContractAddress) {
        const extraLinks = [
          {
            type: DAO_EXTRA_LINKS_TYPES.FACEBOOK,
            url: facebookLink,
          },
          {
            type: DAO_EXTRA_LINKS_TYPES.DISCORD,
            url: discordLink,
          },
          {
            type: DAO_EXTRA_LINKS_TYPES.TWITTER,
            url: twitterLink,
          },
          {
            type: DAO_EXTRA_LINKS_TYPES.WEBSITE,
            url: websiteLink,
          },
        ].filter((link) => link.url);

        const newDao = await daoService.registerNewDao(
          chain.id,
          createdContractAddress,
          sessionData.accessToken,
          description,
          extraLinks
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
    control,
    handleCreateDaoSubmit: handleSubmit(createDao),
    formErrors: errors,
    creatingDaoState,
    txHash,
  };
};
