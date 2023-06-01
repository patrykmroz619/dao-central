"use client";

import { usePanelLayoutState } from "@/modules/layout/panel/providers/PanelLayoutStateProvider";
import { Menu } from "react-feather";

import styles from "./HamburgerButton.module.scss";

export const HamburgerButton = () => {
  const { openSidebar } = usePanelLayoutState();

  return (
    <button className={styles.hamburger} onClick={openSidebar}>
      <Menu />
    </button>
  );
};
