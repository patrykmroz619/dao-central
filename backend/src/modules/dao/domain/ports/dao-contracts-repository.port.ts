export const DaoContractsRepositoryPortToken = "DAO_CONTRACTS_REPOSITORY_PORT";

export interface DaoContractsRepositoryPort {
  getDeployedContractsCount(chainId: number): Promise<number>;

  getContractAddressByIndex(
    chainId: number,
    index: number,
  ): Promise<string | null>;

  getContractDataByChainIdAndAddress(
    chainId: number,
    contractAddress: string,
  ): Promise<{
    ownerAddress: string;
    organizationName: string;
    tokenAddress: string;
  }>;
}
