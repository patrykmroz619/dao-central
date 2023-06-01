import { MouseEvent } from "react";
import { useSwitchNetwork } from "wagmi";

import { useCurrentLanguage } from "@/infrastructure/internationalization/utils/useCurrentLanguage";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { InfoBox } from "@/infrastructure/ui/core/InfoBox";
import { Text } from "@/infrastructure/ui/core/Typography";
import { Button } from "@/infrastructure/ui/core/buttons/Button";

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
