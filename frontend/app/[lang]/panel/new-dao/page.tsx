import { InternationalizedPageProps } from "modules/internationalization/types";
import { useServerTranslation } from "modules/internationalization/useTranslation/server";
import { Box } from "modules/common/components/Box";
import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { H2, Text } from "modules/common/components/Typography";
import { FadeAnimationContainer } from "modules/common/components/FadeAnimationContainer";
import { NewDaoForm } from "modules/dao/components/NewDaoForm";

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
