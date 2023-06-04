import Image from "next/image";
import Link from "next/link";

import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";
import { useServerTranslation } from "@/infrastructure/internationalization/server";
import { removeDuplicatesInArray } from "@/infrastructure/helpers/utils";

import { DefaultPageWrapper } from "@/infrastructure/ui/layout";
import { H1, Text, Box } from "@/infrastructure/ui/core";
import { FadeAnimationContainer } from "@/infrastructure/ui/core/client";

import { FaqTabs } from "@/modules/faq/components/FaqTabs";
import { FaqList } from "@/modules/faq/components/FaqList/";

import faqIllustrations from "public/images/illustrations/faq.svg";
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
      <DefaultPageWrapper className={styles.wrapper}>
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
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
};

export default HelpPage;
