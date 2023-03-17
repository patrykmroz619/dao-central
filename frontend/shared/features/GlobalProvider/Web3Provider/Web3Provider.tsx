import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  goerli,
  polygon,
  polygonMumbai,
  optimism,
  arbitrum,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, polygonMumbai, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_KEY) }),
    infuraProvider({ apiKey: String(process.env.NEXT_PUBLIC_INFURA_KEY) }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "DAO Central",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

type Web3ProviderProps = {
  children: React.ReactNode;
};

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
