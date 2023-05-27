import { InitOptions } from "i18next";

export const languages = ["en", "pl"] as const;
export const fallbackLanguage = "en";

export const namespaces = ["translation"] as const;
export const defaultNamespace = "translation";

export function getOptions(
  lang = fallbackLanguage,
  namespace = defaultNamespace
): InitOptions {
  return {
    supportedLngs: languages,
    fallbackLng: fallbackLanguage,
    lng: lang,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns: namespace,
  };
}
