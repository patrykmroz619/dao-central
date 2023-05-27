import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { Box } from "modules/common/components/Box";
import { H2, Text } from "modules/common/components/Typography";
import { FadeAnimationContainer } from "modules/common/components/FadeAnimationContainer";
import { getSession } from "modules/auth/utils/getSession";
import { DaoService } from "modules/dao/services/daoService";
import { ProfileData } from "modules/user/components/ProfileData";

import styles from "./ProfilePage.module.scss";
import { DaosList } from "modules/dao/components/DaosList";

const ITEMS_PER_PAGE = 8;

const ProfilePage = async () => {
  const { user } = await getSession();

  const daoService = new DaoService();

  const filter = {
    owner: {
      walletAddress: `$eq:${user.wallet}`,
    },
  };

  const { data: daos, count } = await daoService.getDaosList(
    {
      filter,
    },
    0
  );

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

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
          <DaosList
            initialData={daos}
            pageCount={pageCount}
            itemsPerPage={ITEMS_PER_PAGE}
            filter={filter}
          />
        </Box>
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
};

export default ProfilePage;
