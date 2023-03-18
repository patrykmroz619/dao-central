import { useMemo } from "react";

import {
  ASYNC_STATE,
  AsyncStateObject,
} from "modules/common/hooks/useAsyncState";
import { LoadingState } from "./LoadingState";
import { SuccessState } from "./SuccessState";
import { ErrorState } from "./ErrorState";
import styles from "./BlockchainTransactionState.module.scss";

type BlockchainTransactionStateProps = {
  state: AsyncStateObject;
  successHeading: string;
  loadingHeading: string;
  errorHeading: string;
  txHash?: string;
};

export const BlockchainTransactionState = (
  props: BlockchainTransactionStateProps
) => {
  const { state, txHash, successHeading, errorHeading, loadingHeading } = props;

  const content = useMemo(() => {
    switch (state.state) {
      case ASYNC_STATE.LOADING:
        return <LoadingState txHash={txHash} loadingHeading={loadingHeading} />;
      case ASYNC_STATE.ERROR:
        return <ErrorState error={state.error} errorHeading={errorHeading} />;
      case ASYNC_STATE.SUCCESS:
        return <SuccessState successHeading={successHeading} />;
      default:
        return null;
    }
  }, [state, txHash, successHeading, errorHeading, loadingHeading]);

  return <div className={styles.wrapper}>{content}</div>;
};
