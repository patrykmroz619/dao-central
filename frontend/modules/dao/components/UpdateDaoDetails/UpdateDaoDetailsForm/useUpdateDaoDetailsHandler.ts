import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";
import { YupShape } from "modules/common/types/yup-schema";
import { DaoData } from "modules/dao/types/daoData.type";
import { DAO_EXTRA_LINKS_TYPES } from "modules/dao/constants/daoExtraLinksTypes";
import { useAsyncState } from "modules/common/hooks/useAsyncState";
import { getErrorMessage } from "modules/common/utils/getErrorMessage";
import { useDaoService } from "modules/dao/hooks/useDaoService";

type UpdateDaoDetailsFormType = {
  description: string;
  websiteLink: string;
  facebookLink: string;
  twitterLink: string;
  discordLink: string;
};

const updateDaoDetailsFormSchema = yup
  .object()
  .shape<YupShape<UpdateDaoDetailsFormType>>({
    description: yup.string(),
    websiteLink: yup.string().url("invalid-url"),
    facebookLink: yup.string().url("invalid-url"),
    twitterLink: yup.string().url("invalid-url"),
    discordLink: yup.string().url("invalid-url"),
  });

const getDaoLink = (
  links: DaoData["extraLinks"],
  linkType: DAO_EXTRA_LINKS_TYPES
) => {
  return links?.find((link) => link.type === linkType)?.url;
};

export const useUpdateDaoDetailsHandler = () => {
  const { dao } = useDaoDetails();

  const {
    state: updatingState,
    setLoading,
    setError,
    setSuccess,
  } = useAsyncState();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<UpdateDaoDetailsFormType>({
    resolver: yupResolver(updateDaoDetailsFormSchema),
    defaultValues: {
      description: dao.description ?? "",
      websiteLink: getDaoLink(dao.extraLinks, DAO_EXTRA_LINKS_TYPES.WEBSITE),
      facebookLink: getDaoLink(dao.extraLinks, DAO_EXTRA_LINKS_TYPES.FACEBOOK),
      twitterLink: getDaoLink(dao.extraLinks, DAO_EXTRA_LINKS_TYPES.TWITTER),
      discordLink: getDaoLink(dao.extraLinks, DAO_EXTRA_LINKS_TYPES.DISCORD),
    },
  });

  const router = useRouter();
  const daoService = useDaoService();
  const session = useSession();

  const onSubmit = async (formData: UpdateDaoDetailsFormType) => {
    console.log(formData);
    setLoading();
    if (session.status !== "authenticated") {
      router.push("/login");
      return;
    }
    try {
      const {
        description,
        facebookLink,
        discordLink,
        websiteLink,
        twitterLink,
      } = formData;

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

      await daoService.updateDaoDetails(
        dao.id,
        session.data.accessToken,
        description,
        extraLinks
      );
      setSuccess();
      router.refresh();
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      setError(errorMsg);
    }
  };

  return {
    updatingState,
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    formErrors,
  };
};
