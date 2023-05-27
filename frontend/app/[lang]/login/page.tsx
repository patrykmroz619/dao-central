import Image from "next/image";
import organizationImage from "public/images/illustrations/organization.svg";

import { H1, Text } from "modules/common/components/Typography";
import { InlineLink } from "modules/common/components/InlineLink";
import { FadeAnimationContainer } from "modules/common/components/FadeAnimationContainer";
import { WalletLogin } from "modules/auth/components/WalletLogin";

import { InternationalizedPageProps } from "modules/internationalization/types";
import { useServerTranslation } from "modules/internationalization/useTranslation/server";
import styles from "./page.module.scss";

export default async function LoginPage(props: InternationalizedPageProps) {
  const {
    params: { lang },
  } = props;

  const { t } = await useServerTranslation(lang, "login");

  return (
    <FadeAnimationContainer>
      <main className={styles.main}>
        <section className={styles.loginSection}>
          <div className={styles.loginSection__content}>
            <H1>{t("heading")}</H1>
            <Text>{t("subheading")}</Text>
            <WalletLogin />
            <Text>
              Learn more about the application.{" "}
              <InlineLink href="/help">Help center</InlineLink>
            </Text>
          </div>
        </section>
        <div className={styles.illustrationWrapper}>
          <Image src={organizationImage} alt="" priority />
        </div>
      </main>
    </FadeAnimationContainer>
  );
}
