import Image from "next/image";
import Link from "next/link";

import faqIllustrations from "public/images/illustrations/faq.svg";
import { removeDuplicatesInArray } from "modules/common/utils/removeDuplicatesInArray";
import { H1, Text } from "modules/common/components/Typography";
import { FaqTabs } from "modules/faq/components/FaqTabs";
import { Box } from "modules/common/components/Box";
import { FaqList } from "modules/faq/components/FaqList/";

import faqData from "./faq.json";
import styles from "./HelpPage.module.scss";

const HelpPage = () => {
  const categories = removeDuplicatesInArray(
    faqData,
    (item) => item.category
  ).map(({ category, categoryLabel }) => ({
    label: categoryLabel,
    value: category,
  }));

  categories.unshift({ label: "All", value: "all" });

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
      <Box className={styles.faqBox}>
        <FaqTabs options={categories} />
        <FaqList data={faqData} />
      </Box>
    </div>
  );
};

export default HelpPage;
