"use client";

import { useRouter } from "next/navigation";

import { Button } from "modules/common/components/Button";
import { H3, Text } from "modules/common/components/Typography";
import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";

import styles from "./DaosListItem.module.scss";

type DaosListItemProps = {
  id: number;
  heading: string;
  chainId: number;
  networkName: string;
  contractAddress: string;
};

export const DaosListItem = (props: DaosListItemProps) => {
  const { id, heading, chainId, networkName, contractAddress } = props;

  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`panel/daos/${id}`);
  };

  return (
    <li className={styles.item}>
      <div className={styles.item__content}>
        <H3>{heading}</H3>
        <Text bolder>{networkName}</Text>
        <Text>
          Smart Contract:{" "}
          <BlockchainExplorerLink address={contractAddress} chainId={chainId} />
        </Text>
      </div>
      <div className={styles.item__buttonWrapper}>
        <Button
          className={styles.item__detailsBtn}
          onClick={handleDetailsClick}
          role="link"
        >
          Details
        </Button>
      </div>
    </li>
  );
};
