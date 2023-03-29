import { HttpService } from "modules/common/services/httpService";
import { GetQueryParams } from "modules/common/types/getQueryParams.type";
import { PUBLIC_CONFIG } from "modules/core/config/public";
import { DaoData } from "../types/daoData.type";

export class DaoService {
  constructor(
    private api: HttpService = new HttpService(PUBLIC_CONFIG.API_URL)
  ) {}

  public async registerNewDao(
    chainId: number,
    contractAddress: string,
    accessToken: string
  ) {
    const response = await this.api.post<DaoData>(
      "/dao",
      {
        chainId,
        contractAddress,
      },
      {
        bearerToken: accessToken,
      }
    );

    return response.data;
  }

  public async getDaosList(
    params: GetQueryParams<"owner">,
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
