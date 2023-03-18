export const PUBLIC_CONFIG = {
  ALCHEMY_KEY: String(process.env.NEXT_PUBLIC_ALCHEMY_KEY),
  INFURA_KEY: String(process.env.NEXT_PUBLIC_INFURA_KEY),
  API_URL: String(process.env.NEXT_PUBLIC_API_URL),
  CONTRACTS: {
    NFT_VOTING_FACTORY_ADDRESS: String(
      process.env.NEXT_PUBLIC_NFT_VOTING_FACTORY_ADDRESS
    ),
  },
};
