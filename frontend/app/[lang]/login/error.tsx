"use client";

import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { useCurrentLanguage } from "modules/internationalization/utils/useCurrentLanguage";
import { ErrorView } from "modules/layout/components/ErrorView";

const Error = () => {
  const lang = useCurrentLanguage();

  const { t } = useClientTranslation(lang, "errors");

  return <ErrorView>{t("loading-page")}</ErrorView>;
};

export default Error;
