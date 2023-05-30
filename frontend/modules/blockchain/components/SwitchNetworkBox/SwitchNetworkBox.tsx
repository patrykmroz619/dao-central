import { MouseEvent } from "react";
import { useSwitchNetwork } from "wagmi";

import { useCurrentLanguage } from "modules/internationalization/utils/useCurrentLanguage";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { InfoBox } from "modules/common/components/InfoBox";
import { Text } from "modules/common/components/Typography";
import { Button } from "modules/common/components/Button";

import styles from "./SwitchNetworkBox.module.scss";

type SwitchNetworkBoxProps = {
  requiredNetworkId: number;
};

export const SwitchNetworkBox = (props: SwitchNetworkBoxProps) => {
  const { requiredNetworkId } = props;

  const lang = useCurrentLanguage();
  const { t } = useClientTranslation(lang);

  const { switchNetwork, isLoading, chains } = useSwitchNetwork({
    chainId: requiredNetworkId,
  });

  const chainName = chains.find(
    (chain) => chain.id === requiredNetworkId
  )?.name;

  const handleNetworkSwitch = (event: MouseEvent) => {
    event.preventDefault();
    switchNetwork?.();
  };

  return (
    <InfoBox>
      <div className={styles.content}>
        <Text>{t("you-need-switch-network", { chainName })}</Text>
        {switchNetwork && (
          <Button isLoading={isLoading} onClick={handleNetworkSwitch}>
            {t("switch-network")}
          </Button>
        )}
      </div>
    </InfoBox>
  );
};
