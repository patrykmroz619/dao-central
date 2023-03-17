import { restAPI } from "shared/api";
import { DefaultPageWrapper } from "shared/components/DefaultPageWrapper";
import { LastDaosCard, ProfileCard, WelcomeCard } from "./components/page";

import styles from "./HomePage.module.scss";

export default async function HomePage() {
  const { data: lastDaos } = await restAPI.dao.getList({
    limit: 5,
  });

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
