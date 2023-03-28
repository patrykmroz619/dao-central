import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { Box } from "modules/common/components/Box";
import { H2, Text } from "modules/common/components/Typography";
import { getSession } from "modules/auth/utils/getSession";
import { DaoService } from "modules/dao/services/daoService";
import { DaoTable } from "modules/dao/components/DaoTable";

import styles from "./ProfilePage.module.scss";
import { ProfileData } from "modules/user/components/ProfileData";

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const { user } = await getSession();

  const daoService = new DaoService();
  const { data: daos } = await daoService.getDaosList({
    filter: {
      owner: `$eq:${user.wallet + "s"}`,
    },
  });

  return (
    <DefaultPageWrapper className={styles.wrapper}>
      <Box className={styles.box}>
        <H2>Profile</H2>
        <ProfileData user={user} />
      </Box>
      <Box className={styles.box}>
        <H2>Your DAOs</H2>
        <Text>List of your decentralized organizations</Text>
        <DaoTable daos={daos} />
      </Box>
    </DefaultPageWrapper>
  );
};

export default ProfilePage;
