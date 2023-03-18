import { QUERY_PARAM } from "modules/common/constants/queryParams";
import { useGetSearchParam } from "./useGetSearchParam";
import { useSetSearchParam } from "./useSetSearchParam";

export const useSearchParamState = (param: QUERY_PARAM) => {
  const get = useGetSearchParam(param);
  const set = useSetSearchParam(param);

  return [get, set] as const;
};
