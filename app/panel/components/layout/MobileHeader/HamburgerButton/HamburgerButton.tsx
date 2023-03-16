"use client";

import { Menu } from "react-feather";

import { useMainSidebar } from "app/panel/contexts";
import styles from "./HamburgerButton.module.scss";

export const HamburgerButton = () => {
  const { openSidebar } = useMainSidebar();

  return (
    <button className={styles.hamburger} onClick={openSidebar}>
      <Menu />
    </button>
  );
};
