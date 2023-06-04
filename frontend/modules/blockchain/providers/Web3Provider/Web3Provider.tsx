import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  goerli,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

import { PUBLIC_CONFIG } from "@/infrastructure/config/public";
import { COLOR_THEME, useTheme } from "@/infrastructure/services/theme";

const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, polygonMumbai, bsc, bscTestnet],
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
  const { theme } = useTheme();

  const isDarkTheme = theme === COLOR_THEME.DARK;

  const customThemeConfig = {
    accentColor: "var(--primary-500)",
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={
          isDarkTheme
            ? darkTheme(customThemeConfig)
            : lightTheme(customThemeConfig)
        }
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
