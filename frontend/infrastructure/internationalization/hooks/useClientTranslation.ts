"use client";

import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { getOptions } from "../settings";
import { Language, Namespaces } from "../types";

//
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../translations/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
  });

export function useClientTranslation(
  lang: Language,
  ns?: Namespaces,
  keyPrefix?: string
) {
  if (i18next.resolvedLanguage !== lang) i18next.changeLanguage(lang);
  return useTranslationOrg(ns, {
    keyPrefix,
  });
}
