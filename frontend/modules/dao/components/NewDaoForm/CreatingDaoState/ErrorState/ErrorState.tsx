import { useCurrentLanguage } from "@/infrastructure/internationalization/utils/useCurrentLanguage";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { InfoBox, INFO_BOX_VARIANT } from "@/infrastructure/ui/core/InfoBox";
import { Text } from "@/infrastructure/ui/core/Typography";

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
