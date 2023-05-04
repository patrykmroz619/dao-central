type SocialMediaLink = {
  link: string;
  socialMediaName: string;
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
    public socialMediaLinks?: SocialMediaLink[],
  ) {}
}
