"use client";

import { ReactNode, useRef } from "react";
import { motion, Variants } from "framer-motion";

import { useOutsideClick } from "@/infrastructure/helpers/hooks/client";

import { usePanelLayoutState } from "../../providers/PanelLayoutStateProvider";

import styles from "./MainSidebar.module.scss";

const sidebarVariants: Variants = {
  visible: {
    x: -45,
  },
  hidden: {
    x: "-100%",
  },
};

type MainSidebarProps = {
  children: ReactNode;
};

export const MainSidebar = ({ children }: MainSidebarProps) => {
  const { isSidebarOpen, closeSidebar } = usePanelLayoutState();

  const sidebarRef = useRef<HTMLElement>(null);

  useOutsideClick(sidebarRef, closeSidebar);

  return (
    <motion.aside
      animate={isSidebarOpen ? "visible" : "hidden"}
      variants={sidebarVariants}
      className={styles.sidebar}
      ref={sidebarRef}
    >
      {children}
    </motion.aside>
  );
};
