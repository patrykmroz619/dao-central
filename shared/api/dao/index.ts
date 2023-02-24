import qs from "qs";

import { restApiClient } from "../restApiClient";
import { GetQueryParams } from "../types/getQueryParams.type";

type DaoData = {
  id: number;
  organization: string;
  contractAddress: string;
  nftAddress: string;
  owner: string;
};

const save = async (
  chainId: number,
  contractAddress: string,
  accessToken: string
) => {
  const response = await restApiClient<DaoData>("dao", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      chainId,
      contractAddress,
    }),
  });

  return response.data;
};

type GetDaoListResponse = {
  data: DaoData[];
  count: number;
};

const getList = async (params: GetQueryParams<"owner">) => {
  const queryString = qs.stringify(params);

  const response = await restApiClient<GetDaoListResponse>(
    `dao?${queryString}`,
    {
      method: "GET",
    }
  );

  return response.data;
};

export const dao = { save, getList };
