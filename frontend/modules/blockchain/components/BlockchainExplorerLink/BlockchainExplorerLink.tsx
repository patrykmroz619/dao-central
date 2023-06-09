import { InlineLink } from "@/infrastructure/ui/core/client";
import { getChainData } from "modules/blockchain/utils/getChainData";
import { truncateEthAddress } from "modules/blockchain/utils/truncateEthAddress";

type BlockchainExplorerLinkProps = {
  chainId: number;
  address: string;
};

export const BlockchainExplorerLink = (props: BlockchainExplorerLinkProps) => {
  const { chainId, address } = props;

  const chainData = getChainData(chainId);

  const href = `${chainData?.blockExplorers?.default.url}/address/${address}`;

  return (
    <InlineLink href={href} external stopClickEventPropagation>
      {truncateEthAddress(address)}
    </InlineLink>
  );
};
