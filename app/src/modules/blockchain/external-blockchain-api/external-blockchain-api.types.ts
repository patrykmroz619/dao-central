export type ExternalBlockchainApiEvent = {
  contractAddress: string;
  txHash: string;
  blockNumber: number;
  chainId: number;
  data: string;
};
