import { useNetwork } from "wagmi";

import { useCurrentLanguage } from "modules/internationalization/utils/useCurrentLanguage";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { Spinner } from "@/infrastructure/ui/Spinner";
import { Text } from "@/infrastructure/ui/Typography";

import styles from "./LoadingState.module.scss";

type LoadingStateProps = {
  txHash?: string;
};

export const LoadingState = ({ txHash }: LoadingStateProps) => {
  const lang = useCurrentLanguage();
  const { t } = useClientTranslation(lang, "dao", "new-dao-form");

  const { chain } = useNetwork();

  const blockExplorerName = chain?.blockExplorers?.default.name;
  const explorerUrl = `${chain?.blockExplorers?.default.url}/tx/${txHash}`;

  return (
    <div className={styles.wrapper}>
      <Spinner />
      <Text>{t("contract-deployment-in-progres")}</Text>
      {txHash && (
        <a href={explorerUrl} target="_blank" rel="noreferrer noopener">
          {t("view-pending-tx")} {blockExplorerName}
        </a>
      )}
    </div>
  );
};
