import Image from "next/image";
import Link from "next/link";

import { H1, Text } from "modules/common/components/Typography";
import faqIllustrations from "public/images/illustrations/faq.svg";

import styles from "./HelpPage.module.scss";

const HelpPage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <section>
          <Text className={styles.header__subheading}>The FAQs</Text>
          <H1 className={styles.header__heading}>Help centre</H1>
          <Text className={styles.header__description}>
            Everything you need to know about the DAO Central
          </Text>
          <Link href="/panel" className={styles.header__link}>
            Go to app
          </Link>
        </section>
        <Image
          className={styles.header__illustration}
          src={faqIllustrations}
          alt=""
          width={420}
        />
      </header>
    </div>
  );
};

export default HelpPage;
