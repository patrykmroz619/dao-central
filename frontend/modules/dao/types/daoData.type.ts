import { DAO_EXTRA_LINKS_TYPES } from "../constants/daoExtraLinksTypes";

export type DaoData = {
  id: number;
  organization: string;
  contractAddress: string;
  nftAddress: string;
  owner: string;
  chainId: number;
  description?: string;
  extraLinks?: Array<{
    type: DAO_EXTRA_LINKS_TYPES;
    url: string;
  }>;
};
