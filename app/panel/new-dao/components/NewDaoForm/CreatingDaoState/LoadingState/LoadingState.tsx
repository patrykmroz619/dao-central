import { useNetwork } from "wagmi";

import { Spinner } from "shared/components/Spinner";
import { Text } from "shared/components/Typography";

import styles from "./LoadingState.module.scss";

type LoadingStateProps = {
  txHash?: string;
};

export const LoadingState = ({ txHash }: LoadingStateProps) => {
  const { chain } = useNetwork();

  const blockExplorerName = chain?.blockExplorers?.default.name;
  const explorerUrl = `${chain?.blockExplorers?.default.url}/tx/${txHash}`;

  return (
    <div className={styles.wrapper}>
      <Spinner />
      <Text>
        Contract deployment is in progress. Please don&apos;t close the tab
        browser.
      </Text>
      {txHash && (
        <a href={explorerUrl} target="_blank" rel="noreferrer">
          View pending transaction on the {blockExplorerName}
        </a>
      )}
    </div>
  );
};
