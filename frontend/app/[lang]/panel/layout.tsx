import Image from "next/image";

import logo from "public/images/brand/logo-black.png";
import { H1 } from "modules/common/components/Typography";
import { PanelLayoutStateProvider } from "modules/layout/providers/PanelLayoutStateProvider";
import { MainSidebar } from "modules/layout/components/MainSidebar";
import { MobileHeader } from "modules/layout/components/MobileHeader";
import { Navigation } from "modules/layout/components/Navigation";

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
            <Image src={logo} width="80" height="80" alt="DAO Central logo" />
            <H1 className={styles.sidebarContent__heading}>DAO Central</H1>
            <Navigation />
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