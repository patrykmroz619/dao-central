import Image from "next/image";

import logo from "public/images/brand/logo-black.png";
import { H1 } from "@/infrastructure/ui/core/Typography";

import { ThemeSwitch, LanguageSwitcher } from "@/modules/app-settings";
import { PanelLayoutStateProvider } from "@/modules/layout/panel/providers/PanelLayoutStateProvider";
import { MainSidebar } from "@/modules/layout/components/MainSidebar";
import { Navigation } from "@/modules/layout/components/Navigation";
import { MobileHeader } from "@/modules/layout/components/MobileHeader";

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
              <Image src={logo} width="80" height="80" alt="DAO Central logo" />
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
