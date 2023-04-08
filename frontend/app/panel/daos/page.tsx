import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { Box } from "modules/common/components/Box";
import { H2, Text } from "modules/common/components/Typography";
import { FadeAnimationContainer } from "modules/common/components/FadeAnimationContainer";
import { DaoService } from "modules/dao/services/daoService";
import { DaoTable } from "modules/dao/components/DaoTable";

import styles from "./DaosListPage.module.scss";

const DaosListPage = async () => {
  const daoService = new DaoService();
  const { data } = await daoService.getDaosList({}, 0);

  return (
    <FadeAnimationContainer>
      <DefaultPageWrapper>
        <Box className={styles.box}>
          <H2>Explore DAOs</H2>
          <Text>List of created DAOs</Text>
          <DaoTable daos={data} />
        </Box>
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
};

export default DaosListPage;
