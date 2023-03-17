import { restAPI } from "shared/api";
import { DefaultPageWrapper } from "shared/components/DefaultPageWrapper";
import { Box } from "shared/components/Box";
import { H2, Text } from "shared/components/Typography";

import { DaoTable } from "./components";
import styles from "./DaosListPage.module.scss";

export const dynamic = "force-dynamic";

const DaosListPage = async () => {
  const { data } = await restAPI.dao.getList({});

  return (
    <DefaultPageWrapper>
      <Box className={styles.box}>
        <H2>Explore DAOs</H2>
        <Text>List of created DAOs</Text>
        <DaoTable daos={data} />
      </Box>
    </DefaultPageWrapper>
  );
};

export default DaosListPage;
