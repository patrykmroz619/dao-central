import { useCallback } from "react";

import { QUERY_PARAM } from "@/infrastructure/helpers/constants/queryParams";
import { SORT_DIRECTION } from "@/infrastructure/helpers/constants/sortDirection";
import { useSearchParamState } from "@/infrastructure/helpers/hooks/useSearchParamState";

const parseSortParam = (sortParam: string) => {
  const [key, direction] = sortParam.split(":");

  if (direction !== SORT_DIRECTION.ASC && direction !== SORT_DIRECTION.DESC) {
    throw new Error("Invalid sort param");
  }

  return [key, direction] as const;
};

export const useSortableMechanism = (sortQueryParamName: QUERY_PARAM) => {
  const [sortParam, setSortParam] = useSearchParamState(sortQueryParamName);

  const [sortKey, sortDirection] = sortParam
    ? parseSortParam(sortParam)
    : [undefined, undefined];

  const handleSort = useCallback(
    (key: string) => {
      let direction: SORT_DIRECTION | undefined = SORT_DIRECTION.ASC;

      if (key === sortKey) {
        if (sortDirection === SORT_DIRECTION.ASC) {
          direction = SORT_DIRECTION.DESC;
        } else if (sortDirection === SORT_DIRECTION.DESC) {
          setSortParam(undefined);
          return;
        }
      }

      setSortParam(`${key}:${direction}`);
    },
    [sortKey, sortDirection]
  );

  return { sortKey, sortDirection, handleSort };
};
