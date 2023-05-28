"use client";

import { InternationalizedPageProps } from "modules/internationalization/types";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { ErrorView } from "modules/layout/components/ErrorView";

const Error = (props: InternationalizedPageProps) => {
  const {
    params: { lang },
  } = props;

  const { t } = useClientTranslation(lang, "errors");

  return <ErrorView>{t("loading-page")}</ErrorView>;
};

export default Error;
