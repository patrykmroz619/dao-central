"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

import ukFlag from "public/images/icons/uk-flag.svg";
import plFlag from "public/images/icons/pl-flag.svg";
import { useCurrentLanguage } from "@/infrastructure/internationalization/client";

import styles from "./LanguageSwitcher.module.scss";

export const LanguageSwitcher = () => {
  const pathname = usePathname();

  const currentLang = useCurrentLanguage();

  return (
    <div className={styles.wrapper}>
      <Link
        href={pathname?.replace(currentLang, "en") || ""}
        className={classNames(styles.languageBtn, {
          [styles.languageBtn__active]: currentLang === "en",
        })}
      >
        <Image src={ukFlag} width={48} height={25} alt="English language" />
      </Link>
      <Link
        href={pathname?.replace(currentLang, "pl") || ""}
        className={classNames(styles.languageBtn, {
          [styles.languageBtn__active]: currentLang === "pl",
        })}
      >
        <Image src={plFlag} width={48} height={25} alt="Polish language" />
      </Link>
    </div>
  );
};
