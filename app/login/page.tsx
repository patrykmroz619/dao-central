import { LoginIllustration, LoginSection } from "./components";
import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <LoginSection />
      <LoginIllustration />
    </main>
  );
}
