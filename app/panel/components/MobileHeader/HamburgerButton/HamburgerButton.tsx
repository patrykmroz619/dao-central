"use client";

import { useMainSidebar } from "app/panel/features";
import { Menu } from "react-feather";

import styles from "./HamburgerButton.module.scss";

export const HamburgerButton = () => {
  const { openSidebar } = useMainSidebar();

  return (
    <button className={styles.hamburger} onClick={openSidebar}>
      <Menu />
    </button>
  );
};
