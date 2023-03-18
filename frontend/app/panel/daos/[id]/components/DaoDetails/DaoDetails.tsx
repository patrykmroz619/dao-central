import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";
import { VotingPower } from "./VotingPower";
import styles from "./DaoDetails.module.scss";

type DaoDetailsProps = {
  chainName: string;
  chainId: number;
  ownerAddress: string;
  contractAddress: string;
  nftAddress: string;
};

export const DaoDetails = (props: DaoDetailsProps) => {
  const { chainName, contractAddress, ownerAddress, nftAddress, chainId } =
    props;

  const details = [
    { label: "Network", value: chainName },
    {
      label: "Contract address",
      value: (
        <BlockchainExplorerLink address={contractAddress} chainId={chainId} />
      ),
    },
    {
      label: "Owner",
      value: (
        <BlockchainExplorerLink address={ownerAddress} chainId={chainId} />
      ),
    },
    {
      label: "NFT address",
      value: <BlockchainExplorerLink address={nftAddress} chainId={chainId} />,
    },
    {
      label: "Voting power",
      value: <VotingPower />,
    },
  ];

  return (
    <ul className={styles.list}>
      {details.map((detail) => (
        <li className={styles.list__item} key={detail.label}>
          <strong>{detail.label}: </strong>
          <span>{detail.value}</span>
        </li>
      ))}
    </ul>
  );
};
