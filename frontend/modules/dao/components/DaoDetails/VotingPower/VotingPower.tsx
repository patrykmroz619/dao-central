"use client";

import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";
import { InternationalizedProps } from "@/infrastructure/internationalization/types";
import { useClientTranslation } from "@/infrastructure/internationalization/client";

export const VotingPower = (props: InternationalizedProps) => {
  const { lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

  const { userNFTs } = useDaoDetails();

  const numberOfNFTs = userNFTs.length;

  return (
    <>
      {t("you-have-nfts", {
        numberOfNFTs,
      })}
    </>
  );
};
