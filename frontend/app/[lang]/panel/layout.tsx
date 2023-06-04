import { H1 } from "@/infrastructure/ui/core";

import { AppLogo } from "@/modules/brand";
import { ThemeSwitch, LanguageSwitcher } from "@/modules/app-settings/client";

import {
  MainSidebar,
  Navigation,
  PanelLayoutStateProvider,
} from "@/modules/layout/panel/client";
import { MobileHeader } from "@/modules/layout/panel";

import styles from "./PanelLayout.module.scss";

type PanelLayoutProps = {
  children: React.ReactNode;
};

const PanelLayout = ({ children }: PanelLayoutProps) => {
  return (
    <main className={styles.wrapper}>
      <PanelLayoutStateProvider>
        <MainSidebar>
          <div className={styles.sidebarContent}>
            <div />
            <div className={styles.sidebarContent__logo}>
              <AppLogo size={80} />
            </div>
            <H1 className={styles.sidebarContent__heading}>DAO Central</H1>
            <Navigation />
            <div className={styles.settings}>
              <LanguageSwitcher />
              <ThemeSwitch />
            </div>
          </div>
        </MainSidebar>

        <div className={styles.wrapper__pageContent}>
          <MobileHeader />
          <section>{children}</section>
        </div>
      </PanelLayoutStateProvider>
    </main>
  );
};

export default PanelLayout;
