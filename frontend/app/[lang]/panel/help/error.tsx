"use client";

import {
  useClientTranslation,
  useCurrentLanguage,
} from "@/infrastructure/internationalization/client";
import { ErrorView } from "@/infrastructure/ui/layout";

const Error = () => {
  const lang = useCurrentLanguage();

  const { t } = useClientTranslation(lang, "errors");

  return <ErrorView>{t("loading-page")}</ErrorView>;
};

export default Error;
