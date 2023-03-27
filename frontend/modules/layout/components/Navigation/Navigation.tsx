"use client";

import { useSession } from "next-auth/react";
import { Home, Archive, PlusCircle, User } from "react-feather";

import { NavLink } from "modules/common/components/NavLink";
import { usePanelLayoutState } from "modules/layout/providers/PanelLayoutStateProvider";
import { LogoutButton } from "modules/auth/components/LogoutButton";

import styles from "./Navigation.module.scss";

const links = [
  {
    href: "/panel",
    label: "Home",
    Icon: Home,
  },
  {
    href: "/panel/daos",
    label: "Explore DAOs",
    Icon: Archive,
  },
  {
    href: "/panel/new-dao",
    label: "New DAO",
    Icon: PlusCircle,
  },
  {
    href: "/panel/profile",
    label: "Profile",
    Icon: User,
  },
];

export const Navigation = () => {
  const { closeSidebar } = usePanelLayoutState();

  const { status } = useSession();

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
        {status === "authenticated" && (
          <li className={styles.navigation__listItem} key="logout">
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
};
