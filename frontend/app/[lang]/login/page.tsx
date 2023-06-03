import Image from "next/image";
import organizationImage from "public/images/illustrations/organization.svg";

import { H1, Text } from "@/infrastructure/ui/core/Typography";
import { InlineLink } from "@/infrastructure/ui/core/InlineLink";
import { FadeAnimationContainer } from "@/infrastructure/ui/core/FadeAnimationContainer";
import { WalletLogin } from "modules/auth/components/WalletLogin";

import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";
import { useServerTranslation } from "@/infrastructure/internationalization/server";
import { ThemeSwitch, LanguageSwitcher } from "@/modules/app-settings";

import styles from "./page.module.scss";

export default async function LoginPage(props: InternationalizedPageProps) {
  const {
    params: { lang },
  } = props;

  const { t } = await useServerTranslation(lang, "login-page");

  return (
    <FadeAnimationContainer>
      <main className={styles.main}>
        <section className={styles.loginSection}>
          <div className={styles.loginSection__content}>
            <H1>{t("heading")}</H1>
            <Text>{t("subheading")}</Text>
            <WalletLogin lang={lang} />
            <Text>
              {t("learn-more")}{" "}
              <InlineLink href="/help">{t("help-center")}</InlineLink>
            </Text>
            <div className={styles.settings}>
              <LanguageSwitcher />
              <ThemeSwitch />
            </div>
          </div>
        </section>
        <div className={styles.illustrationWrapper}>
          <Image src={organizationImage} alt="" priority />
        </div>
      </main>
    </FadeAnimationContainer>
  );
}
