import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";
import { useServerTranslation } from "@/infrastructure/internationalization/server";

import { DefaultPageWrapper } from "@/infrastructure/ui/layout";
import { Box, H2, Text } from "@/infrastructure/ui/core";
import { FadeAnimationContainer } from "@/infrastructure/ui/core/client";

import { getSession } from "@/modules/auth/utils/getSession";
import { DaoService } from "@/modules/dao/services/daoService";
import { ProfileData } from "@/modules/user";
import { DaosList } from "@/modules/dao/components/DaosList";

import styles from "./ProfilePage.module.scss";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 8;

const ProfilePage = async (props: InternationalizedPageProps) => {
  const {
    params: { lang },
  } = props;

  const { t } = await useServerTranslation(lang, "profile");

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
          <H2>{t("profile")}</H2>
          {/* @ts-expect-error Server Component  */}
          <ProfileData user={user} lang={lang} />
        </Box>
        <Box className={styles.box}>
          <H2>{t("your-daos")}</H2>
          <Text>{t("list-of-your-daos")}</Text>
          <DaosList
            initialData={daos}
            pageCount={pageCount}
            itemsPerPage={ITEMS_PER_PAGE}
            filter={filter}
            lang={lang}
          />
        </Box>
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
};

export default ProfilePage;
