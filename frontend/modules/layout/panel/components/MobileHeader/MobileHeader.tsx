import { Text } from "@/infrastructure/ui/core";

import { AppLogo } from "@/modules/brand";
import { HamburgerButton } from "./HamburgerButton";

import styles from "./MobileHeader.module.scss";

export const MobileHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__brand}>
        <AppLogo size={32} />
        <Text>DAO Central</Text>
      </div>
      <HamburgerButton />
    </header>
  );
};
