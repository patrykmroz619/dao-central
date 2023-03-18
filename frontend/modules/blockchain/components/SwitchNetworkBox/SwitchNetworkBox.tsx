import { useSwitchNetwork } from "wagmi";

import { InfoBox } from "modules/common/components/InfoBox";
import { Text } from "modules/common/components/Typography";
import { Button } from "modules/common/components/Button";

import styles from "./SwitchNetworkBox.module.scss";
import { MouseEvent } from "react";

type SwitchNetworkBoxProps = {
  requiredNetworkId: number;
};

export const SwitchNetworkBox = (props: SwitchNetworkBoxProps) => {
  const { requiredNetworkId } = props;

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
        <Text>You need to switch network in your wallet on {chainName}</Text>
        {switchNetwork && (
          <Button isLoading={isLoading} onClick={handleNetworkSwitch}>
            Switch network
          </Button>
        )}
      </div>
    </InfoBox>
  );
};
