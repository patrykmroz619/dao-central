import { useNetwork } from "wagmi";

import { Spinner } from "@/infrastructure/ui/core/Spinner";
import { Text } from "@/infrastructure/ui/core/Typography";
import { InfoBox } from "@/infrastructure/ui/core/InfoBox";

import styles from "./LoadingState.module.scss";

type LoadingStateProps = {
  txHash?: string;
  loadingHeading: string;
};

export const LoadingState = (props: LoadingStateProps) => {
  const { loadingHeading, txHash } = props;

  const { chain } = useNetwork();

  const blockExplorerName = chain?.blockExplorers?.default.name;
  const explorerUrl = `${chain?.blockExplorers?.default.url}/tx/${txHash}`;

  return (
    <InfoBox className={styles.wrapper}>
      <Spinner />
      <Text>{loadingHeading}</Text>
      {txHash && (
        <a href={explorerUrl} target="_blank" rel="noreferrer noopener">
          View pending transaction on the {blockExplorerName}
        </a>
      )}
    </InfoBox>
  );
};
