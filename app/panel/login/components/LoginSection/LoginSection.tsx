import { H1, Text } from "shared/components";
import styles from "./LoginSection.module.scss";
import { WalletLogin } from "./WalletLogin";

export function LoginSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <H1>Sign in to DAO Central</H1>
        <Text>
          Empower your community - the future of decentralized organization is
          here.
        </Text>
        <WalletLogin />
      </div>
    </section>
  );
}
