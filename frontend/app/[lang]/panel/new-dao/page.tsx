import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";
import { useServerTranslation } from "@/infrastructure/internationalization/server";

import { DefaultPageWrapper } from "@/infrastructure/ui/layout";
import { H2, Text, Box } from "@/infrastructure/ui/core";
import { FadeAnimationContainer } from "@/infrastructure/ui/core/client";

import { NewDaoForm } from "@/modules/dao/components/NewDaoForm";

import styles from "./NewDaoPage.module.scss";

const NewDaoPage = async (props: InternationalizedPageProps) => {
  const {
    params: { lang },
  } = props;

  const { t } = await useServerTranslation(lang, "dao");

  return (
    <FadeAnimationContainer>
      <DefaultPageWrapper>
        <div className={styles.wrapper}>
          <Box className={styles.wrapper__form}>
            <H2>{t("new-dao-form.heading")}</H2>
            <Text>{t("new-dao-form.description")}</Text>
            <NewDaoForm lang={lang} />
          </Box>
        </div>
      </DefaultPageWrapper>
    </FadeAnimationContainer>
  );
};

export default NewDaoPage;
