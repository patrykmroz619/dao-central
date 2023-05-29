"use client";

import { Home, Archive, PlusCircle, User, HelpCircle } from "react-feather";

import { NavLink } from "modules/common/components/NavLink";
import { usePanelLayoutState } from "modules/layout/providers/PanelLayoutStateProvider";
import { LogoutButton } from "modules/auth/components/LogoutButton";

import styles from "./Navigation.module.scss";
import { useCurrentLanguage } from "modules/internationalization/utils/useCurrentLanguage";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { useMemo } from "react";

export const Navigation = () => {
  const { closeSidebar } = usePanelLayoutState();

  const lang = useCurrentLanguage();

  const { t } = useClientTranslation(lang, "global");

  const links = useMemo(
    () => [
      {
        href: `${lang}/panel`,
        label: t("navigation.home"),
        Icon: Home,
      },
      {
        href: `${lang}/panel/daos`,
        label: t("navigation.explore-daos"),
        Icon: Archive,
      },
      {
        href: `${lang}/panel/new-dao`,
        label: t("navigation.new-dao"),
        Icon: PlusCircle,
      },
      {
        href: `${lang}/panel/profile`,
        label: t("navigation.profile"),
        Icon: User,
      },
      {
        href: `${lang}/help`,
        label: t("navigation.help-center"),
        Icon: HelpCircle,
      },
    ],
    [t, lang]
  );

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {links.map((link) => (
          <li className={styles.navigation__listItem} key={link.href}>
            <NavLink
              onClick={closeSidebar}
              activeClassName={styles.navigation__link_active}
              className={styles.navigation__link}
              href={link.href}
            >
              <link.Icon />
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
        <li className={styles.navigation__listItem} key="logout">
          <LogoutButton>{t("logout")}</LogoutButton>
        </li>
      </ul>
    </nav>
  );
};
