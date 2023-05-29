import Image from "next/image";
import Link from "next/link";

import faqIllustrations from "public/images/illustrations/faq.svg";
import { InternationalizedPageProps } from "modules/internationalization/types";
import { useServerTranslation } from "modules/internationalization/useTranslation/server";
import { removeDuplicatesInArray } from "modules/common/utils/removeDuplicatesInArray";
import { H1, Text } from "modules/common/components/Typography";
import { Box } from "modules/common/components/Box";
import { FadeAnimationContainer } from "modules/common/components/FadeAnimationContainer";
import { FaqTabs } from "modules/faq/components/FaqTabs";
import { FaqList } from "modules/faq/components/FaqList/";

import faqData from "./faq.json";
import styles from "./HelpPage.module.scss";

const HelpPage = async (props: InternationalizedPageProps) => {
  const {
    params: { lang },
  } = props;

  const { t } = await useServerTranslation(lang, "help-center");

  const categories = removeDuplicatesInArray(
    faqData,
    (item) => item.category
  ).map(({ category, categoryLabel }) => ({
    label: categoryLabel[lang],
    value: category,
  }));

  categories.unshift({ label: "All", value: "all" });

  const faqItems = faqData.map((item) => ({
    category: item.category,
    categoryLabel: item.categoryLabel[lang],
    question: item.question[lang],
    answer: item.answer[lang],
  }));

  return (
    <FadeAnimationContainer>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <section>
            <Text className={styles.header__subheading}>{t("the-faqs")}</Text>
            <H1 className={styles.header__heading}>{t("heading")}</H1>
            <Text className={styles.header__description}>
              {t("description")}
            </Text>
            <Link href="/" className={styles.header__link}>
              {t("go-to-app")}
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
          <FaqList data={faqItems} />
        </Box>
      </div>
    </FadeAnimationContainer>
  );
};

export default HelpPage;
