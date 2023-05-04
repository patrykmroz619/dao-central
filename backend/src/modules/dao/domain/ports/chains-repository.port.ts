type ChainId = number;

export const ChainsRepositoryPortToken = "CHAINS_REPOSITORY_PORT_TOKEN";

export interface ChainsRepositoryPort {
  getChainIds(): Promise<ChainId[]>;
}
