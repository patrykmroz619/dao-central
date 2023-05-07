import { HttpService } from "modules/common/services/httpService";
import { GetQueryParams } from "modules/common/types/getQueryParams.type";
import { PUBLIC_CONFIG } from "modules/core/config/public";

import { DAO_EXTRA_LINKS_TYPES } from "../constants/daoExtraLinksTypes";
import { DaoData } from "../types/daoData.type";

type GetDaoFilter = {
  owner: {
    walletAddress: string;
  };
};

type RegisterDaoResponse = {
  daoId: number;
};

export class DaoService {
  constructor(
    private api: HttpService = new HttpService(PUBLIC_CONFIG.API_URL)
  ) {}

  public async registerNewDao(
    chainId: number,
    contractAddress: string,
    accessToken: string,
    description?: string,
    extraLinks?: Array<{
      type: DAO_EXTRA_LINKS_TYPES;
      url: string;
    }>
  ) {
    const response = await this.api.post<RegisterDaoResponse>(
      "/dao",
      {
        chainId,
        contractAddress,
        description,
        extraLinks,
      },
      {
        bearerToken: accessToken,
      }
    );

    return response.data;
  }

  public async getDaosList(
    params: GetQueryParams<GetDaoFilter>,
    revalidate?: number
  ) {
    type GetDaoListResponse = {
      data: DaoData[];
      count: number;
    };

    const response = await this.api.get<GetDaoListResponse>("/dao", {
      params,
      next: {
        revalidate,
      },
    });

    return response.data;
  }

  public async getDaoById(daoId: string) {
    const response = await this.api.get<DaoData>(`/dao/${daoId}`);

    return response.data;
  }
}
