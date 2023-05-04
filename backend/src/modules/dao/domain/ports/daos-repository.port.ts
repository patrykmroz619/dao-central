import { PaginateQuery } from "nestjs-paginate";
import { DaoModel } from "../models/dao.model";
import { SaveDaoData } from "../types/save-dao-data.type";

export const DaosRepositoryToken = "DAOS_REPOSITORY_TOKEN";

export interface DaosRepositoryPort {
  getDaosByChainId(chainId: number): Promise<DaoModel[]>;

  getDaoById(daoId: number): Promise<DaoModel | null>;

  getPaginatedDaoData(
    query: PaginateQuery,
  ): Promise<{ count: number; data: DaoModel[] }>;

  saveDao(daoData: SaveDaoData): Promise<DaoModel>;

  getDaoByChainIdAndAddress(
    chainId: number,
    contractAddress: string,
  ): Promise<DaoModel | null>;
}
