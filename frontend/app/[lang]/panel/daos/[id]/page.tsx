import { Language } from "modules/internationalization/types";
import { useServerTranslation } from "modules/internationalization/useTranslation/server";
import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { H2 } from "modules/common/components/Typography";
import { Box } from "modules/common/components/Box";
import { DaoService } from "modules/dao/services/daoService";
import { DaoDetailsProvider } from "modules/dao/providers/DaoDetailsProvider";
import { DaoDetails } from "modules/dao/components/DaoDetails";
import { NewVotingButton } from "modules/dao/components/NewVotingButton";
import { ProposalsList } from "modules/dao/components/ProposalsList";
import { UpdateDaoDetails } from "modules/dao/components/UpdateDaoDetails";

import styles from "./DaoDetailsPage.module.scss";

type DaoDetailsPageProps = {
  params: {
    id: string;
    lang: Language;
  };
};

export const revalidate = 120;

export default async function DaoDetailsPage(props: DaoDetailsPageProps) {
  const {
    params: { id: daoId, lang },
  } = props;

  const { t } = await useServerTranslation(lang, "dao", "dao-details");

  const daoService = new DaoService();
  const dao = await daoService.getDaoById(daoId);

  return (
    <DefaultPageWrapper>
      <DaoDetailsProvider daoData={dao}>
        <section>
          <Box>
            <H2 className={styles.heading}>{dao.organization}</H2>
            {/* @ts-expect-error Server component */}
            <DaoDetails daoData={dao} lang={lang} />
            <div className={styles.updateDetailsBtnWrapper}>
              <UpdateDaoDetails lang={lang} />
            </div>
          </Box>
        </section>
        <section>
          <Box className={styles.votingBox}>
            <div className={styles.votingBox__header}>
              <H2 className={styles.heading}>{t("vote-on-proposals")}</H2>
              <NewVotingButton lang={lang} />
            </div>
            <ProposalsList lang={lang} />
          </Box>
        </section>
      </DaoDetailsProvider>
    </DefaultPageWrapper>
  );
}
