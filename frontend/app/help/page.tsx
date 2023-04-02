import Image from "next/image";
import Link from "next/link";

import { H1, Text } from "modules/common/components/Typography";
import { FaqTabs } from "modules/faq/components/FaqTabs";
import { Box } from "modules/common/components/Box";
import faqIllustrations from "public/images/illustrations/faq.svg";

import styles from "./HelpPage.module.scss";

const HelpPage = () => {
  const faqCategories = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "DAO",
      value: "dao",
    },
    {
      label: "Wallet",
      value: "wallet",
    },
  ];

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
      <Box>
        <FaqTabs options={faqCategories} />
      </Box>
    </div>
  );
};

export default HelpPage;
