import { Box } from "modules/common/components/Box";
import { DefaultPageWrapper } from "modules/common/layout/DefaultPageWrapper";
import { H2, Text } from "modules/common/components/Typography";
import { NewDaoForm } from "./components";

import styles from "./NewDaoPage.module.scss";

const NewDaoPage = () => {
  return (
    <DefaultPageWrapper>
      <Box className={styles.box}>
        <H2>New DAO</H2>
        <Text>
          To launch a new DAO, create a dedicated smart contract for your
          organization using the form below
        </Text>
        <NewDaoForm />
      </Box>
    </DefaultPageWrapper>
  );
};

export default NewDaoPage;
