import { useSearchParams } from "next/navigation";

export const useGetSearchParam = (param: string) => {
  const searchParams = useSearchParams();

  return searchParams?.get(param);
};
