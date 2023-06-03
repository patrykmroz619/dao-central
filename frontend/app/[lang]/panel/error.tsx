"use client";

import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { useCurrentLanguage } from "@/infrastructure/internationalization/client";
import { ErrorView } from "@/infrastructure/ui/layout/ErrorView";

const Error = () => {
  const lang = useCurrentLanguage();

  const { t } = useClientTranslation(lang, "errors");

  return <ErrorView>{t("loading-page")}</ErrorView>;
};

export default Error;
