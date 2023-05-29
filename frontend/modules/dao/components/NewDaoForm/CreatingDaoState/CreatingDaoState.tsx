import { useMemo } from "react";

import {
  ASYNC_STATE,
  AsyncStateObject,
} from "modules/common/hooks/useAsyncState";

import { InitialInfo } from "./InitialInfo";
import { LoadingState } from "./LoadingState";
import { SuccessState } from "./SuccessState";
import { ErrorState } from "./ErrorState";

import styles from "./CreatingDaoState.module.scss";

type CreatingDaoStateProps = {
  state: AsyncStateObject;
  txHash?: string;
};

export const CreatingDaoState = (props: CreatingDaoStateProps) => {
  const { state, txHash } = props;

  const content = useMemo(() => {
    switch (state.state) {
      case ASYNC_STATE.INITIAL:
        return <InitialInfo />;
      case ASYNC_STATE.LOADING:
        return <LoadingState txHash={txHash} />;
      case ASYNC_STATE.ERROR:
        return <ErrorState error={state.error} />;
      case ASYNC_STATE.SUCCESS:
        return <SuccessState />;
      default:
        return null;
    }
  }, [state, txHash]);

  return <div className={styles.wrapper}>{content}</div>;
};
