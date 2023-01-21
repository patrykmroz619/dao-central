export const ERRORS = {
  auth: {
    invalidSignature: "Invalid signature",
    invalidEthAddress: "Invalid ethereum address",
  },
  chains: {
    chainAlreadyExists: "A chain with the same id already exists",
  },
  rpcProviders: {
    invalidUrl: "The passed url is invalid",
    providerAlreadyExists: "The provider with given url already exists",
    chainNotFound: "Chain not found for given provider",
  },
} as const;
