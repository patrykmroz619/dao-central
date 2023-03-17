import { useNetwork } from "wagmi";

import { Spinner } from "shared/components/Spinner";
import { Text } from "shared/components/Typography";

import styles from "./LoadingState.module.scss";
import { InfoBox } from "shared/components/InfoBox";

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