import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";
import { useServerTranslation } from "@/infrastructure/internationalization/server";

import { DefaultPageWrapper } from "@/infrastructure/ui/layout";
import { H2, Text, Box } from "@/infrastructure/ui/core";
import { FadeAnimationContainer } from "@/infrastructure/ui/core/client";

import { DaoService } from "@/modules/dao/services/daoService";
import { DaosList } from "@/modules/dao/components/DaosList";

import styles from "./DaosListPage.module.scss";

const DAOS_PER_PAGE = 8;

const DaosListPage = async (props: InternationalizedPageProps) => {
  const {
    params: { lang },
  } = props;

  const { t } = await useServerTranslation(lang, "dao", "explore-daos");

  const daoService = new DaoService();
  const { data, count } = await daoService.getDaosList(
    {
      page: 1,
      limit: DAOS_PER_PAGE,
    },
    60
  );

  const pageCount = Math.ceil(count / DAOS_PER_PAGE);

  return (
    <FadeAnimationContainer>
      <DefaultPageWrapper>
        <Box className={styles.box}>
          <H2>{t("explore-daos")}</H2>
          <Text>{t("list-of-daos")}</Text>
          <DaosList
            initialData={data}
            itemsPerPage={DAOS_PER_PAGE}
            pageCount={pageCount}
            lang={lang}
          />
        </Box>
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
};

export default DaosListPage;
