import { getChainData } from "shared/utils/getChainData";
import { truncateEthAddress } from "shared/utils/truncateEthAddress";

type BlockchainExplorerLinkProps = {
  chainId: number;
  address: string;
};

export const BlockchainExplorerLink = (props: BlockchainExplorerLinkProps) => {
  const { chainId, address } = props;

  const chainData = getChainData(chainId);

  const href = `${chainData?.blockExplorers?.default.url}/address/${address}`;

  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {truncateEthAddress(address)}
    </a>
  );
};
