import { useGetSearchParam } from "./useGetSearchParam";
import { useSetSearchParam } from "./useSetSearchParam";

export const useSearchParamState = (param: string) => {
  const get = useGetSearchParam(param);
  const set = useSetSearchParam(param);

  return [get, set] as const;
};
