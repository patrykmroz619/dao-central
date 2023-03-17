import { DaoData } from "shared/api/types/daoData.type";
import { Box } from "shared/components/Box";
import { H2 } from "shared/components/Typography";
import { DaosListItem } from "./DaosListItem";
import { ExploreDaosBtn } from "./ExploreDaosBtn";

import styles from "./LastDaosCard.module.scss";

type LastDaosCardProps = {
  daos: DaoData[];
};

export const LastDaosCard = (props: LastDaosCardProps) => {
  const { daos } = props;

  return (
    <Box className={styles.box}>
      <H2>Last created DAOs</H2>
      <ul className={styles.list}>
        {daos.map((dao) => (
          <DaosListItem
            key={dao.id}
            id={dao.id}
            heading={dao.organization}
            chainId={dao.chainId}
            networkName={dao.chainName}
            contractAddress={dao.contractAddress}
          />
        ))}
      </ul>
      <div className={styles.footer}>
        <ExploreDaosBtn />
      </div>
    </Box>
  );
};
