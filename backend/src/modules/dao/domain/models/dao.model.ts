import { DAO_EXTRA_LINK_TYPE } from "../constants/dao-extra-link.enum";

type ExtraLink = {
  type: DAO_EXTRA_LINK_TYPE;
  url: string;
};

export class DaoModel {
  constructor(
    public id: number,
    public chainId: number,
    public contractAddress: string,
    public ownerAddress: string,
    public organizationName: string,
    public tokenAddress: string,
    public organizationDescription?: string,
    public extraLinks?: ExtraLink[],
  ) {}
}
