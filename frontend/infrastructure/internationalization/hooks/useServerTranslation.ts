import "server-only";

import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

import { getOptions } from "../settings";
import { Language, Namespaces } from "../types";

const initI18next = async (lang: string, ns?: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../translations/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lang, ns));
  return i18nInstance;
};

export async function useServerTranslation(
  lang: Language,
  ns?: Namespaces,
  keyPrefix?: string
) {
  const i18nextInstance = await initI18next(lang, ns);
  return {
    t: i18nextInstance.getFixedT(lang, ns, keyPrefix),
    i18n: i18nextInstance,
  };
}
