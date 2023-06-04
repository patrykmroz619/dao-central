import { useCallback } from "react";

import { useSearchParamState } from "@/infrastructure/helpers/hooks/useSearchParamState";
import { TABLE_SORT_DIRECTION } from "./Table.types";

const parseSortParam = (sortParam: string) => {
  const [key, direction] = sortParam.split(":");

  if (
    direction !== TABLE_SORT_DIRECTION.ASC &&
    direction !== TABLE_SORT_DIRECTION.DESC
  ) {
    throw new Error("Invalid sort param");
  }

  return [key, direction] as const;
};

export const useSortableMechanism = (sortQueryParamName: string) => {
  const [sortParam, setSortParam] = useSearchParamState(sortQueryParamName);

  const [sortKey, sortDirection] = sortParam
    ? parseSortParam(sortParam)
    : [undefined, undefined];

  const handleSort = useCallback(
    (key: string) => {
      let direction: TABLE_SORT_DIRECTION | undefined =
        TABLE_SORT_DIRECTION.ASC;

      if (key === sortKey) {
        if (sortDirection === TABLE_SORT_DIRECTION.ASC) {
          direction = TABLE_SORT_DIRECTION.DESC;
        } else if (sortDirection === TABLE_SORT_DIRECTION.DESC) {
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
