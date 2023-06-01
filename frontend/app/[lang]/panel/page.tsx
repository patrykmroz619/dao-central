import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";
import { useServerTranslation } from "@/infrastructure/internationalization/server";
import { DefaultPageWrapper } from "@/infrastructure/ui/layout/DefaultPageWrapper";
import { DaoService } from "modules/dao/services/daoService";
import { LastDaosCard } from "modules/dao/components/LastDaosCard";
import { ProfileCard } from "modules/user/components/ProfileCard";
import { WelcomeCard } from "modules/brand/components/WelcomeCard";
import { FadeAnimationContainer } from "@/infrastructure/ui/core/FadeAnimationContainer";

import styles from "./HomePage.module.scss";

export default async function HomePage(props: InternationalizedPageProps) {
  const {
    params: { lang },
  } = props;

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
            {/* @ts-expect-error Server component */}
            <LastDaosCard daos={lastDaos} lang={lang} />
          </div>
          <div className={styles.cardsWrapper__secondCard}>
            <ProfileCard />
          </div>
        </div>
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
}
