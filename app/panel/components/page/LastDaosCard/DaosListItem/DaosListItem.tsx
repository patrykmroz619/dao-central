"use client";

import { useRouter } from "next/navigation";

import { Button } from "shared/components/Button";
import { H3, Text } from "shared/components/Typography";
import { BlockchainExplorerLink } from "shared/features/common/BlockchainExplorerLink";

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
    router.push(`/daos/${id}`);
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
