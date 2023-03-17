export const truncateEthAddress = (address: string) =>
  `${address.substring(0, 10)}...${address.substring(address.length - 2)}`;
