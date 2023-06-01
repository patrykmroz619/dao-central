import { getChainData } from "modules/blockchain/utils/getChainData";
import { Box } from "@/infrastructure/ui/Box";
import { H2 } from "@/infrastructure/ui/Typography";
import { DaoData } from "modules/dao/types/daoData.type";
import { InternationalizedProps } from "modules/internationalization/types";
import { useServerTranslation } from "modules/internationalization/useTranslation/server";
import { DaosListItem } from "./DaosListItem";
import { ExploreDaosBtn } from "./ExploreDaosBtn";

import styles from "./LastDaosCard.module.scss";

type LastDaosCardProps = {
  daos: DaoData[];
} & InternationalizedProps;

export const LastDaosCard = async (props: LastDaosCardProps) => {
  const { daos, lang } = props;

  const { t } = await useServerTranslation(lang, "dao", "dao-list");

  return (
    <Box className={styles.box}>
      <H2>{t("last-created-daos")}</H2>
      <ul className={styles.list}>
        {daos.map((dao) => (
          <DaosListItem
            key={dao.id}
            id={dao.id}
            heading={dao.organization}
            chainId={dao.chainId}
            networkName={getChainData(dao.chainId)?.name || "-"}
            contractAddress={dao.contractAddress}
            lang={lang}
          />
        ))}
      </ul>
      <div className={styles.footer}>
        <ExploreDaosBtn>{t("explore-daos")}</ExploreDaosBtn>
      </div>
    </Box>
  );
};
