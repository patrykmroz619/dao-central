import { useState } from "react";

export enum AsyncState {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

type AsyncStateType =
  | {
      state: AsyncState.INITIAL;
    }
  | {
      state: AsyncState.LOADING;
    }
  | {
      state: AsyncState.SUCCESS;
    }
  | { state: AsyncState.ERROR; error: string };

export const useAsyncState = () => {
  const [state, setState] = useState<AsyncStateType>({
    state: AsyncState.INITIAL,
  });

  const setLoading = () => setState({ state: AsyncState.LOADING });

  const setError = (error: string) =>
    setState({ state: AsyncState.ERROR, error });

  const setSuccess = () => setState({ state: AsyncState.SUCCESS });

  const resetState = () => setState({ state: AsyncState.INITIAL });

  return { state, setLoading, setSuccess, setError, resetState };
};
