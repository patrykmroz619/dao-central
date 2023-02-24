import {
  mainnet,
  goerli,
  bsc,
  bscTestnet,
  polygon,
  polygonMumbai,
  optimism,
  arbitrum,
  Chain,
} from "wagmi/chains";

export const getChainData = (chainId: number): Chain | null => {
  return (
    [
      mainnet,
      goerli,
      bsc,
      bscTestnet,
      polygon,
      polygonMumbai,
      optimism,
      arbitrum,
    ].find((chain) => chain.id === chainId) || null
  );
};
