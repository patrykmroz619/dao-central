import Image from "next/image";

import { Box } from "modules/common/components/Box";
import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { H2, Text } from "modules/common/components/Typography";
import { NewDaoForm } from "modules/dao/components/NewDaoForm";
import setupIllustration from "public/images/illustrations/setup.svg";

import styles from "./NewDaoPage.module.scss";

const NewDaoPage = () => {
  return (
    <DefaultPageWrapper>
      <div className={styles.wrapper}>
        <Box className={styles.wrapper__form}>
          <H2>New DAO</H2>
          <Text>
            To launch a new DAO, create a dedicated smart contract for your
            organization using the form below
          </Text>
          <NewDaoForm />
        </Box>
        <div className={styles.wrapper__image}>
          <Image src={setupIllustration} alt="" width={480} />
        </div>
      </div>
    </DefaultPageWrapper>
  );
};

export default NewDaoPage;
