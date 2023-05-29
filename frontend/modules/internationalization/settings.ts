import { InitOptions } from "i18next";

export const languages = ["en", "pl"] as const;
export const fallbackLanguage = "en";

export const namespaces = [
  "global",
  "errors",
  "login-page",
  "help-center",
] as const;
export const defaultNamespace = "global";

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
