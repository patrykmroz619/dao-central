import { restApiClient } from "../restApiClient";

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

export const dao = { save };
