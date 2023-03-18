import Image from "next/image";

import logo from "public/images/brand/logo-black.png";
import { H1 } from "modules/common/components/Typography";
import { MainSidebar, Navigation, MobileHeader } from "./components/layout";
import { MainSidebarContextProvider } from "./contexts";
import styles from "./PanelLayout.module.scss";

type PanelLayoutProps = {
  children: React.ReactNode;
};

const PanelLayout = ({ children }: PanelLayoutProps) => {
  return (
    <main className={styles.wrapper}>
      <MainSidebarContextProvider>
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
      </MainSidebarContextProvider>
    </main>
  );
};

export default PanelLayout;
