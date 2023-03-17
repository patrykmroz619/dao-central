import { useSearchParams } from "next/navigation";

import { QUERY_PARAM } from "shared/constants/queryParams";

export const useGetSearchParam = (param: QUERY_PARAM) => {
  const searchParams = useSearchParams();

  return searchParams?.get(param);
};
