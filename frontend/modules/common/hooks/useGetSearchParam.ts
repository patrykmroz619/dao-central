import { useSearchParams } from "next/navigation";

import { QUERY_PARAM } from "modules/common/constants/queryParams";

export const useGetSearchParam = (param: QUERY_PARAM) => {
  const searchParams = useSearchParams();

  return searchParams?.get(param);
};
