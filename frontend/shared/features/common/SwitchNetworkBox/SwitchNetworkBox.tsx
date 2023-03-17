import { useSwitchNetwork } from "wagmi";

import { InfoBox } from "shared/components/InfoBox";
import { Text } from "shared/components/Typography";
import { Button } from "shared/components/Button";

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
