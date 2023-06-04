import { InternationalizedProps } from "@/infrastructure/internationalization";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { NoData } from "@/infrastructure/ui/core";

type NoProposalsProps = InternationalizedProps;

export const NoProposals = (props: NoProposalsProps) => {
  const { lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

  return <NoData>{t("no-proposals")}</NoData>;
};
