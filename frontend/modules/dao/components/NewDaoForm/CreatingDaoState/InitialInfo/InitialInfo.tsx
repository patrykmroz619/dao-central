import { Skeleton } from "modules/common/components/Skeleton";
import { Text } from "modules/common/components/Typography";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { useCurrentLanguage } from "modules/internationalization/utils/useCurrentLanguage";
import { useAccount, useBalance, useNetwork } from "wagmi";

import styles from "./InitialInfo.module.scss";

export const InitialInfo = () => {
  const { address, isConnecting, isConnected } = useAccount();
  const { data, isFetching } = useBalance({ address });
  const { chain } = useNetwork();

  const lang = useCurrentLanguage();
  const { t } = useClientTranslation(lang, "dao", {
    keyPrefix: "new-dao-form",
  });

  if (!isConnected) {
    return <Text center>{t("connect-wallet-to-deploy")}</Text>;
  }

  const dataItems = [
    {
      label: t("connected-wallet"),
      value: address,
      isLoading: isConnecting,
    },
    {
      label: t("balance"),
      value: `${data?.formatted} ${data?.symbol}`,
      isLoading: isFetching,
    },
    {
      label: t("network"),
      value: chain?.unsupported ? t("unsupported") : chain?.name,
      isLoading: false,
    },
  ];

  return (
    <ul className={styles.list}>
      {dataItems.map((item) => (
        <li key={item.label} className={styles.list__item}>
          <strong>{item.label}: </strong>
          {item.isLoading ? <Skeleton inline width="150px" /> : item.value}
        </li>
      ))}
      <Text>{t("wallet-deployment-info")}</Text>
    </ul>
  );
};
