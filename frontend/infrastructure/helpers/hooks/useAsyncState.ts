import { useState } from "react";

export enum ASYNC_STATE {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type AsyncStateObject =
  | {
      state: ASYNC_STATE.INITIAL;
    }
  | {
      state: ASYNC_STATE.LOADING;
    }
  | {
      state: ASYNC_STATE.SUCCESS;
    }
  | { state: ASYNC_STATE.ERROR; error: string };

export const useAsyncState = () => {
  const [state, setState] = useState<AsyncStateObject>({
    state: ASYNC_STATE.INITIAL,
  });

  const setLoading = () => setState({ state: ASYNC_STATE.LOADING });

  const setError = (error: string) =>
    setState({ state: ASYNC_STATE.ERROR, error });

  const setSuccess = () => setState({ state: ASYNC_STATE.SUCCESS });

  const resetState = () => setState({ state: ASYNC_STATE.INITIAL });

  return { state, setLoading, setSuccess, setError, resetState };
};
