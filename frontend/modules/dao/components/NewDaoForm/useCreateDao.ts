import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNetwork, useSigner } from "wagmi";
import { ethers } from "ethers";
import * as yup from "yup";

import { YupShape } from "@/infrastructure/helpers/types/yup-schema";
import { getErrorMessage } from "@/infrastructure/helpers/utils/getErrorMessage";
import { useAsyncState } from "@/infrastructure/helpers/hooks/useAsyncState";
import { ethAddressValidation } from "modules/blockchain/utils/ethAddressValidation";
import { useDaoService } from "modules/dao/hooks/useDaoService";
import { PUBLIC_CONFIG } from "@/infrastructure/config/public";
import { NFT_VOTING_FACTORY_CONTRACT_ABI } from "modules/dao/constants/nftVotingFactoryContractAbi";
import { DAO_EXTRA_LINKS_TYPES } from "modules/dao/constants/daoExtraLinksTypes";
import { useCurrentLanguage } from "@/infrastructure/internationalization/utils/useCurrentLanguage";
import { useClientTranslation } from "@/infrastructure/internationalization/client";

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
  organizationName: yup.string().required("organization-name-is-required"),
  nftAddress: yup.string().test(ethAddressValidation),
  description: yup.string(),
  websiteLink: yup.string().url("invalid-url"),
  facebookLink: yup.string().url("invalid-url"),
  twitterLink: yup.string().url("invalid-url"),
  discordLink: yup.string().url("invalid-url"),
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

  const lang = useCurrentLanguage();
  const { t } = useClientTranslation(lang, "dao", "new-dao-form");

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
        router.replace(`${lang}/panel/dao/${newDao.daoId}`);
      } else {
        router.replace(`${lang}/panel/profile`);
      }

      setSuccess();
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e, t("creating-dao-error") ?? "");
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
