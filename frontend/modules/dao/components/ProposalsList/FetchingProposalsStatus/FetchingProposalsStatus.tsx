import { InternationalizedProps } from "@/infrastructure/internationalization";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { Spinner, Text } from "@/infrastructure/ui/core";

import styles from "./FetchingProposalsStatus.module.scss";

type FetchingProposalsStatusProps = {
  totalProposals: number | null;
  fetchedProposals: number;
} & InternationalizedProps;

export const FetchingProposalsStatus = (
  props: FetchingProposalsStatusProps
) => {
  const { fetchedProposals, totalProposals, lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

  if (totalProposals === fetchedProposals) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.spinnerWrapper}>
        {totalProposals !== null && (
          <Text className={styles.counter}>
            {fetchedProposals}/{totalProposals}
          </Text>
        )}
        <Spinner size={100} className={styles.spinner} />
      </div>
      <Text className={styles.label} bold>
        {t("fetching-proposals")}
      </Text>
    </div>
  );
};
