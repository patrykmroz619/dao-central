import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSetSearchParam = (param: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const set = useCallback(
    (value?: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) {
        params.set(param, value);
      } else {
        params.delete(param);
      }

      const queryParams = params.toString();

      if (queryParams) {
        router.push(`${pathname}?${queryParams}`);
      } else {
        router.push(pathname as string);
      }
    },
    [param, pathname, searchParams]
  );

  return set;
};
