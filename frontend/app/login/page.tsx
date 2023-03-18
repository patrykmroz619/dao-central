import Image from "next/image";
import organizationImage from "public/images/illustrations/organization.svg";

import styles from "./page.module.scss";
import { H1, Text } from "modules/common/components/Typography";
import { WalletLogin } from "modules/auth/components/WalletLogin";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <section className={styles.loginSection}>
        <div className={styles.loginSection__content}>
          <H1>Sign in to DAO Central</H1>
          <Text>
            Empower your community - the future of decentralized organization is
            here.
          </Text>
          <WalletLogin />
        </div>
      </section>
      <div className={styles.illustrationWrapper}>
        <Image src={organizationImage} alt="" priority />
      </div>
    </main>
  );
}
