import qs from "qs";

import { HTTP_METHOD } from "modules/common/constants/httpMethod";
import { restApiClient } from "../restApiClient";
import { DaoData } from "../types/daoData.type";
import { GetQueryParams } from "../types/getQueryParams.type";

const save = async (
  chainId: number,
  contractAddress: string,
  accessToken: string
) => {
  const response = await restApiClient<DaoData>("dao", {
    method: HTTP_METHOD.POST,
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
      method: HTTP_METHOD.GET,
      cache: "no-store",
    }
  );

  return response.data;
};

const getById = async (daoId: string) => {
  const response = await restApiClient<DaoData>(`dao/${daoId}`, {
    method: HTTP_METHOD.GET,
  });

  return response.data;
};

export const dao = { save, getList, getById };
