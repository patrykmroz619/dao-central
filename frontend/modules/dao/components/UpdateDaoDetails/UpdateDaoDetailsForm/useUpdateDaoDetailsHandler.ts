import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";
import { YupShape } from "modules/common/types/yup-schema";
import { DaoData } from "modules/dao/types/daoData.type";
import { DAO_EXTRA_LINKS_TYPES } from "modules/dao/constants/daoExtraLinksTypes";
import { useAsyncState } from "modules/common/hooks/useAsyncState";
import { getErrorMessage } from "modules/common/utils/getErrorMessage";

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
    websiteLink: yup.string(),
    facebookLink: yup.string(),
    twitterLink: yup.string(),
    discordLink: yup.string(),
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
    resetState,
  } = useAsyncState();

  const { register, control, handleSubmit } = useForm<UpdateDaoDetailsFormType>(
    {
      resolver: yupResolver(updateDaoDetailsFormSchema),
      defaultValues: {
        description: dao.description ?? "",
        websiteLink: getDaoLink(dao.extraLinks, DAO_EXTRA_LINKS_TYPES.WEBSITE),
        facebookLink: getDaoLink(
          dao.extraLinks,
          DAO_EXTRA_LINKS_TYPES.FACEBOOK
        ),
        twitterLink: getDaoLink(dao.extraLinks, DAO_EXTRA_LINKS_TYPES.TWITTER),
        discordLink: getDaoLink(dao.extraLinks, DAO_EXTRA_LINKS_TYPES.DISCORD),
      },
    }
  );

  const onSubmit = async (formData: UpdateDaoDetailsFormType) => {
    console.log(formData);
    setLoading();
    try {
      resetState();
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
  };
};
