import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";
import { VotingPower } from "./VotingPower";
import styles from "./DaoDetails.module.scss";
import { getChainData } from "modules/blockchain/utils/getChainData";
import { DaoData } from "modules/dao/types/daoData.type";
import { Separator } from "modules/common/components/Separator";
import { DaoLinks } from "./DaoLinks";

type DaoDetailsProps = {
  daoData: DaoData;
};

export const DaoDetails = (props: DaoDetailsProps) => {
  const {
    daoData: {
      contractAddress,
      nftAddress,
      chainId,
      owner,
      description,
      extraLinks = [],
    },
  } = props;

  const chainData = getChainData(chainId);

  const details = [
    { label: "Network", value: chainData?.name },
    {
      label: "Contract address",
      value: (
        <BlockchainExplorerLink address={contractAddress} chainId={chainId} />
      ),
    },
    {
      label: "Owner",
      value: <BlockchainExplorerLink address={owner} chainId={chainId} />,
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
