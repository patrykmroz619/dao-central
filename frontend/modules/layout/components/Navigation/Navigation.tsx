"use client";

import { useMemo } from "react";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Home,
  Archive,
  PlusCircle,
  User,
  HelpCircle,
  LogIn,
} from "react-feather";

import { useCurrentLanguage } from "@/infrastructure/internationalization/client";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { NavLink } from "@/infrastructure/ui/core/NavLink";

import { LogoutButton } from "modules/auth/components/LogoutButton";
import { usePanelLayoutState } from "../../panel/providers/PanelLayoutStateProvider";

import styles from "./Navigation.module.scss";

export const Navigation = () => {
  const { closeSidebar } = usePanelLayoutState();

  const lang = useCurrentLanguage();

  const { t } = useClientTranslation(lang, "global");

  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  const links = useMemo(
    () => [
      {
        href: `${lang}/panel`,
        label: t("navigation.home"),
        Icon: Home,
        disabled: false,
      },
      {
        href: `${lang}/panel/daos`,
        label: t("navigation.explore-daos"),
        Icon: Archive,
        disabled: false,
      },
      {
        href: `${lang}/panel/new-dao`,
        label: t("navigation.new-dao"),
        Icon: PlusCircle,
        disabled: !isAuthenticated,
      },
      {
        href: `${lang}/panel/profile`,
        label: t("navigation.profile"),
        Icon: User,
        disabled: !isAuthenticated,
      },
      {
        href: `${lang}/help`,
        label: t("navigation.help-center"),
        Icon: HelpCircle,
        disabled: false,
      },
    ],
    [t, lang, isAuthenticated]
  );

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {links.map((link) => (
          <li className={styles.navigation__listItem} key={link.href}>
            <NavLink
              onClick={closeSidebar}
              activeClassName={styles.navigation__link_active}
              className={classNames(styles.navigation__link, {
                [styles.navigation__link_disabled]: link.disabled,
              })}
              href={link.href}
            >
              <link.Icon />
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
        {isAuthenticated ? (
          <li className={styles.navigation__listItem} key="logout">
            <LogoutButton>{t("logout")}</LogoutButton>
          </li>
        ) : (
          <li className={styles.navigation__listItem} key="login">
            <NavLink
              onClick={closeSidebar}
              activeClassName={styles.navigation__link_active}
              className={styles.navigation__link}
              href={`${lang}/login`}
            >
              <LogIn />
              <span>{t("login")}</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
