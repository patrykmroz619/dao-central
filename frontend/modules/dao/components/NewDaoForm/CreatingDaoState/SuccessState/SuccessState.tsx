import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { useCurrentLanguage } from "modules/internationalization/utils/useCurrentLanguage";
import { InfoBox, INFO_BOX_VARIANT } from "@/infrastructure/ui/InfoBox";

import styles from "./SuccessState.module.scss";

export const SuccessState = () => {
  const lang = useCurrentLanguage();
  const { t } = useClientTranslation(lang, "dao", "new-dao-form");

  return (
    <InfoBox variant={INFO_BOX_VARIANT.SUCCESS} className={styles.box}>
      {t("successful-deployment")}
    </InfoBox>
  );
};
