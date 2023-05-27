import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { Box } from "modules/common/components/Box";
import { H2, Text } from "modules/common/components/Typography";
import { FadeAnimationContainer } from "modules/common/components/FadeAnimationContainer";
import { DaoService } from "modules/dao/services/daoService";
import { DaoTable } from "modules/dao/components/DaoTable";

import styles from "./DaosListPage.module.scss";

const DAOS_PER_PAGE = 8;

const DaosListPage = async () => {
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
          <H2>Explore DAOs</H2>
          <Text>List of created DAOs</Text>
          <DaoTable
            initialData={data}
            itemsPerPage={DAOS_PER_PAGE}
            pageCount={pageCount}
          />
        </Box>
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
};

export default DaosListPage;
