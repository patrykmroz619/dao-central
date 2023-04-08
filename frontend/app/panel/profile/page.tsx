import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { Box } from "modules/common/components/Box";
import { H2, Text } from "modules/common/components/Typography";
import { FadeAnimationContainer } from "modules/common/components/FadeAnimationContainer";
import { getSession } from "modules/auth/utils/getSession";
import { DaoService } from "modules/dao/services/daoService";
import { DaoTable } from "modules/dao/components/DaoTable";
import { ProfileData } from "modules/user/components/ProfileData";

import styles from "./ProfilePage.module.scss";

const ProfilePage = async () => {
  const { user } = await getSession();

  const daoService = new DaoService();
  const { data: daos } = await daoService.getDaosList(
    {
      filter: {
        owner: {
          walletAddress: `$eq:${user.wallet}`,
        },
      },
    },
    0
  );

  return (
    <FadeAnimationContainer>
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
    </FadeAnimationContainer>
  );
};

export default ProfilePage;
