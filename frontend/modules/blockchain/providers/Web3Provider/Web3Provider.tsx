import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
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

import { PUBLIC_CONFIG } from "modules/core/config/public";

const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, polygonMumbai, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: PUBLIC_CONFIG.ALCHEMY_KEY }),
    infuraProvider({ apiKey: PUBLIC_CONFIG.INFURA_KEY }),
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
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#4548f7",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
