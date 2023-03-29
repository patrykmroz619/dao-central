import { redirect } from "next/navigation";

import { getSession } from "modules/auth/utils/getSession";
import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { DaoService } from "modules/dao/services/daoService";
import { LastDaosCard } from "modules/dao/components/LastDaosCard";
import { ProfileCard } from "modules/user/components/ProfileCard";
import { WelcomeCard } from "modules/brand/components/WelcomeCard";

import styles from "./HomePage.module.scss";

export default async function HomePage() {
  const { user } = await getSession();

  if (!user) {
    redirect("/login");
  }

  const daoService = new DaoService();
  const { data: lastDaos } = await daoService.getDaosList(
    {
      limit: 5,
    },
    0
  );

  return (
    <DefaultPageWrapper>
      <WelcomeCard />
      <div className={styles.cardWrapper}>
        <LastDaosCard daos={lastDaos} />
        <ProfileCard />
      </div>
    </DefaultPageWrapper>
  );
}
