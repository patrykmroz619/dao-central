import { useCurrentLanguage } from "modules/internationalization/utils/useCurrentLanguage";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { InfoBox, INFO_BOX_VARIANT } from "modules/common/components/InfoBox";
import { Text } from "modules/common/components/Typography";

import styles from "./ErrorState.module.scss";

type ErrorStateProps = {
  error: string;
};

export const ErrorState = ({ error }: ErrorStateProps) => {
  const lang = useCurrentLanguage();
  const { t } = useClientTranslation(lang, "dao", "new-dao-form");

  return (
    <InfoBox variant={INFO_BOX_VARIANT.DANGER} className={styles.box}>
      <div className={styles.box__content}>
        <Text bold center>
          {t("error-while-deploying")}
        </Text>
        <Text center>{error}</Text>
      </div>
    </InfoBox>
  );
};
