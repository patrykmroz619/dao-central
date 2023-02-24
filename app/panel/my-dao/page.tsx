import { getSession } from "shared/utils/getSession";
import { restAPI } from "shared/api";
import { Box } from "shared/components/Box";
import { DefaultPageWrapper } from "shared/components/DefaultPageWrapper";
import { H2, Text } from "shared/components/Typography";
import { MyDaoTable } from "./features";
import styles from "./MyDaoPage.module.scss";

export const dynamic = "force-dynamic";

const MyDaoPage = async () => {
  const { user } = await getSession();

  const { data } = await restAPI.dao.getList({
    filter: {
      owner: user.wallet.toLowerCase(),
    },
  });

  return (
    <DefaultPageWrapper>
      <Box className={styles.box}>
        <H2>My DAOs</H2>
        <Text>List of your created DAO contracts</Text>
        <MyDaoTable daos={data} />
      </Box>
    </DefaultPageWrapper>
  );
};

export default MyDaoPage;
