export const languages = ["en", "pl"];
export const fallbackLanguage = "en";
export const defaultNS = "translation";

export function getOptions(lang = fallbackLanguage, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng: fallbackLanguage,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
