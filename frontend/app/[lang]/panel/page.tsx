import { redirect } from "next/navigation";

import { InternationalizedPageProps } from "modules/internationalization/types";
import { useServerTranslation } from "modules/internationalization/useTranslation/server";
import { getSession } from "modules/auth/utils/getSession";
import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { DaoService } from "modules/dao/services/daoService";
import { LastDaosCard } from "modules/dao/components/LastDaosCard";
import { ProfileCard } from "modules/user/components/ProfileCard";
import { WelcomeCard } from "modules/brand/components/WelcomeCard";
import { FadeAnimationContainer } from "modules/common/components/FadeAnimationContainer";

import styles from "./HomePage.module.scss";

export default async function HomePage(props: InternationalizedPageProps) {
  const {
    params: { lang },
  } = props;

  const { user } = await getSession();

  if (!user) {
    redirect(`/${lang}/login`);
  }

  const daoService = new DaoService();
  const { data: lastDaos } = await daoService.getDaosList(
    {
      limit: 5,
    },
    0
  );

  const { t } = await useServerTranslation(lang);

  return (
    <FadeAnimationContainer>
      <DefaultPageWrapper>
        <WelcomeCard welcomeMsg={t("global:welcome-in")} />
        <div className={styles.cardsWrapper}>
          <div className={styles.cardsWrapper__firstCard}>
            <LastDaosCard daos={lastDaos} />
          </div>
          <div className={styles.cardsWrapper__secondCard}>
            <ProfileCard />
          </div>
        </div>
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
}
