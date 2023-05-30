import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";
import { useServerTranslation } from "modules/internationalization/useTranslation/server";
import { InternationalizedProps } from "modules/internationalization/types";
import { getChainData } from "modules/blockchain/utils/getChainData";
import { DaoData } from "modules/dao/types/daoData.type";
import { Separator } from "modules/common/components/Separator";
import { DaoLinks } from "./DaoLinks";
import { VotingPower } from "./VotingPower";

import styles from "./DaoDetails.module.scss";

type DaoDetailsProps = {
  daoData: DaoData;
} & InternationalizedProps;

export const DaoDetails = async (props: DaoDetailsProps) => {
  const {
    daoData: {
      contractAddress,
      nftAddress,
      chainId,
      owner,
      description,
      extraLinks = [],
    },
    lang,
  } = props;

  const { t } = await useServerTranslation(lang, "dao", "dao-details");

  const chainData = getChainData(chainId);

  const details = [
    { label: t("network"), value: chainData?.name },
    {
      label: t("contract-address"),
      value: (
        <BlockchainExplorerLink address={contractAddress} chainId={chainId} />
      ),
    },
    {
      label: t("owner"),
      value: <BlockchainExplorerLink address={owner} chainId={chainId} />,
    },
    {
      label: t("nft-address"),
      value: <BlockchainExplorerLink address={nftAddress} chainId={chainId} />,
    },
    {
      label: t("voting-power"),
      value: <VotingPower lang={lang} />,
    },
  ];

  return (
    <div>
      <ul className={styles.list}>
        {details.map((detail) => (
          <li className={styles.list__item} key={detail.label}>
            <strong>{detail.label}</strong>
            <span className={styles.list__item__value}>{detail.value}</span>
          </li>
        ))}
      </ul>
      {description ? (
        <>
          <Separator className={styles.separator} />
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </>
      ) : null}
      {extraLinks.length > 0 ? (
        <>
          <Separator className={styles.separator} />
          <DaoLinks links={extraLinks} />
        </>
      ) : null}
    </div>
  );
};
