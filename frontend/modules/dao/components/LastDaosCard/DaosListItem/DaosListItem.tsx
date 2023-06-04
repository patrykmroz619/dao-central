"use client";

import { useRouter } from "next/navigation";

import { InternationalizedProps } from "@/infrastructure/internationalization/types";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { Button } from "@/infrastructure/ui/core/buttons/Button";
import { H3, Text } from "@/infrastructure/ui/core/Typography";
import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";

import styles from "./DaosListItem.module.scss";

type DaosListItemProps = {
  id: number;
  heading: string;
  chainId: number;
  networkName: string;
  contractAddress: string;
} & InternationalizedProps;

export const DaosListItem = (props: DaosListItemProps) => {
  const { id, heading, chainId, networkName, contractAddress, lang } = props;

  const router = useRouter();

  const { t } = useClientTranslation(lang, "dao", "dao-list");

  const handleDetailsClick = () => {
    router.push(`${lang}/panel/daos/${id}`);
  };

  return (
    <li className={styles.item}>
      <H3>{heading}</H3>
      <div className={styles.item__details}>
        <div className={styles.item__content}>
          <Text bolder>{networkName}</Text>
          <Text>
            {t("smart-contract")}:{" "}
            <BlockchainExplorerLink
              address={contractAddress}
              chainId={chainId}
            />
          </Text>
        </div>
        <div className={styles.item__buttonWrapper}>
          <Button
            className={styles.item__detailsBtn}
            onClick={handleDetailsClick}
            role="link"
          >
            {t("details")}
          </Button>
        </div>
      </div>
    </li>
  );
};
