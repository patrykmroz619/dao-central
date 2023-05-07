import { DaoModel } from "../models/dao.model";

export type SaveDaoData = {
  chainId: number;
  contractAddress: string;
  ownerAddress: string;
  organizationName: string;
  tokenAddress: string;
  organizationDescription?: string;
  extraLinks?: DaoModel["extraLinks"];
};
